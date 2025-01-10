import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { getUserById } from "@/api-client/modules/userApiClient";
import { UserType } from "@/types/UserType";
import { Button } from "@nextui-org/react";

const VideoChat: React.FC = () => {
  const { userId: userIdParam } = useParams();

  const { videoChatRoomId } = useParams<{ videoChatRoomId: string }>();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket>();
  const peerConnectionRef = useRef<RTCPeerConnection>();

  const [isMicrophoneMuted, setIsMicrophoneMuted] = useState<boolean>(false);
  const [isWebcamOff, setIsWebcamOff] = useState<boolean>(false);

  const [otherUser, setOtherUser] = useState<UserType | undefined>(undefined);

  const fethcOtherUser = async () => {
    if (!userIdParam) return;
    const result = await getUserById(userIdParam);
    setOtherUser(result.data.user);
  };

  useEffect(() => {
    fethcOtherUser();
  }, [userIdParam]);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_API_URI, {
      withCredentials: true,
    });

    socketRef.current.emit("join-video-chat-room", videoChatRoomId);

    socketRef.current.on("join-video-chat-room-accept", (roomId: string) => {
      console.log(`Joined room: ${roomId}`);
      initializeMediaDevices();
    });

    socketRef.current.on("join-video-chat-room-reject", (roomId: string) => {
      console.error(`Failed to join room: ${roomId}`);
    });

    return () => {
      socketRef.current?.disconnect();
      localStream?.getTracks().forEach((track) => track.stop());
    };
  }, [videoChatRoomId]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      console.log("remoteVideoRef.current.srcObject = remoteStream;");
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream, remoteVideoRef]);

  const initializeMediaDevices = async () => {
    try {
      console.log("Attempting to initialize media devices");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setupPeerConnection(stream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const setupPeerConnection = (stream: MediaStream) => {
    console.log("Setting up peer connection");
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: `turn:${import.meta.env.VITE_TURN_SERVER_IP}`,
          username: import.meta.env.VITE_TURN_SERVER_USERNAME,
          credential: import.meta.env.VITE_TURN_SERVER_PASSWORD,
        },
      ],
      // iceTransportPolicy: "relay",
    });

    stream.getTracks().forEach((track) => {
      console.log("stream.getTracks()", { track });
      peerConnectionRef.current?.addTrack(track, stream);
    });

    peerConnectionRef.current.ontrack = (event) => {
      console.log(
        "peerConnectionRef.current.ontrack",
        { event },
        event.streams[0]
      );
      setRemoteStream(event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peerConnectionRef.current.onicecandidate = (event) => {
      console.log("peerConnectionRef.current.onicecandidate", { event });
      if (event.candidate) {
        socketRef.current?.emit("ice-candidate", {
          candidate: event.candidate,
          roomId: videoChatRoomId,
        });
        console.log("Sent ICE Candidate:", event.candidate, {
          videoChatRoomId,
          event,
        });
      } else {
        console.log("All ICE candidates sent");
      }
    };

    // temporarily added for debugging:
    peerConnectionRef.current.oniceconnectionstatechange = () => {
      console.log(
        "ICE connection state:",
        peerConnectionRef.current?.iceConnectionState
      );
    };

    // for temp debug:
    peerConnectionRef.current.onconnectionstatechange = () => {
      console.log(
        "Connection state:",
        peerConnectionRef.current?.connectionState
      );
    };

    socketRef.current?.on("ice-candidate", (iceCandidate: RTCIceCandidate) => {
      console.log("socketRef.current?.on(ice-candidate)", { iceCandidate });
      peerConnectionRef.current
        ?.addIceCandidate(new RTCIceCandidate(iceCandidate))
        .catch((error) => {
          console.error("Error adding ice candidate", error);
        });
      console.log("ice candidate added", { iceCandidate });
    });

    socketRef.current?.on("offer", async (offer: RTCSessionDescriptionInit) => {
      console.log("socketRef.current?.on(offer)", { offer });
      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(offer)
      );

      const answer = await peerConnectionRef.current?.createAnswer();

      await peerConnectionRef.current?.setLocalDescription(answer);
      socketRef.current?.emit("answer", { answer, roomId: videoChatRoomId });
      console.log("Sent answer", { answer, roomId: videoChatRoomId });
    });

    socketRef.current?.on("answer", (answer: RTCSessionDescriptionInit) => {
      console.log("socketRef.current?.on(answer)", { answer });
      peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    socketRef.current?.on("user-left", (userId) => {
      console.log("user left with id: " + userId);
      setRemoteStream(null);
      // peerConnectionRef.current?.close();
    });

    createAndSendOffer();
  };

  const createAndSendOffer = async () => {
    console.log("Creating and sending offer");
    const offer = await peerConnectionRef.current?.createOffer();
    await peerConnectionRef.current?.setLocalDescription(offer);
    socketRef.current?.emit("offer", { offer, roomId: videoChatRoomId });
    console.log("Sent offer", { offer, roomId: videoChatRoomId });
  };

  const toggleMicrophone = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicrophoneMuted(!audioTrack.enabled);
    }
  };

  const toggleWebcam = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsWebcamOff(!videoTrack.enabled);
    }
  };

  return (
    <div className="min-h-[calc(100vh-50px)] bg-gray-100 flex flex-col gap-y-4 px-4 py-12">
      <div className="flex gap-x-2 justify-center">
        <div>
          <video
            className="border border-gray-500 rounded-lg shadow-lg h-fit"
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
          ></video>
          <p className="text-center mt-4 font-semibold">You</p>
        </div>

        {remoteStream && (
          <div>
            <video
              className="border border-gray-500 rounded-lg shadow-lg h-fit"
              ref={remoteVideoRef}
              autoPlay
              playsInline
            />
            <p className="text-center mt-4 font-semibold">
              {otherUser?.username}
            </p>
          </div>
        )}
      </div>
      <div className="flex gap-x-8 justify-center mt-8">
        <div className="flex gap-x-4">
          <Button
            color={isMicrophoneMuted ? "danger" : "primary"}
            className={"rounded-full"}
            onClick={toggleMicrophone}
          >
            {!isMicrophoneMuted ? (
              <Mic color={"white"} />
            ) : (
              <MicOff color="white" />
            )}
          </Button>
          <Button
            color={isWebcamOff ? "danger" : "primary"}
            className={"rounded-full"}
            onClick={toggleWebcam}
          >
            {!isWebcamOff ? (
              <Video color={"white"} />
            ) : (
              <VideoOff color={"white"} />
            )}
          </Button>
        </div>
        <Button
          color="danger"
          onClick={() => (window.location.href = "/user/" + userIdParam)}
        >
          Leave
        </Button>
      </div>
    </div>
  );
};

export default VideoChat;
