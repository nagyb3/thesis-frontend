# thesis-frontend

### Steps to run this project locally:

1. Install node and npm (if necesary): https://nodejs.org/en/download

2. Clone the repository to your machine using the terminal

```bash
git clone git@github.com:nagyb3/thesis-frontend.git
```

3. Navigate to the cloned repository:

```bash
cd thesis-frontend
```

4. Install the dependencies using NPM:

```bash
npm install
```

5. Create a file named `.env` for managing environment variables in the root of this project and give it following content:

```bash
VITE_API_URI="http://localhost:5500"
VITE_TURN_SERVER_IP=
VITE_TURN_SERVER_USERNAME=
VITE_TURN_SERVER_PASSWORD=
```

6. Run the project

```bash
npm run dev
```
