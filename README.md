# thesis-frontend

### Steps to run this project locally:

1. Install Node (if necesary): https://nodejs.org/en/download

2. Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (if necessary)

3. Clone the repository to your machine:

```bash
git clone https://github.com/nagyb3/thesis-frontend
```

4. Navigate to the cloned repository:

```bash
cd thesis-frontend
```

5. Install the dependencies using NPM:

```bash
npm install
```

6. Create a file named .env in the root directory of this project to manage environment variables, and add the following content:

```bash
VITE_API_URI="http://localhost:5500"
VITE_TURN_SERVER_IP=
VITE_TURN_SERVER_USERNAME=
VITE_TURN_SERVER_PASSWORD=
```

7. Run the project

```bash
npm run dev
```
