# Two-Tier To-Do Application Stack

A production-ready, multi-container To-Do web application hosted on AWS EC2. Built using FastAPI, Nginx, and MySQL, with data persistence and continuous deployment via GitHub Actions.

---

## 🏗️ System Architecture

* **Frontend**: Nginx serving static assets (HTML/CSS/JavaScript) on port `8080`.
* **Backend**: FastAPI (Python 3.11) exposing REST APIs on port `8000`.
* **Database**: MySQL 8.4 handling persistent task storage on port `3306`.
* **Networking**: Containers communicate over an isolated Docker bridge network (`todo_net`).
* **CI/CD**: GitHub Actions pipeline over SSH for automated deployment.

---

## 🚀 Quick Start (Local & EC2)

### Prerequisites

* Docker & Docker Compose V2 installed
* Git configured

### Installation & Run

1. **Clone the repository:**
```bash
git clone https://github.com/K-deharkar/to-do-two-tier.git
cd to-do-two-tier

```


2. **Start the application stack:**
```bash
sudo docker compose up -d --build

```


3. **Verify running containers:**
```bash
sudo docker compose ps

```


4. Access the web client at `http://<YOUR-SERVER-IP>:8080`.

---

## 🛠️ Project Structure

```text
to-do-two-tier/
├── backend/
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── script.js
│   └── style.css
├── database/
│   └── init.sql
├── .github/
│   └── workflows/
│       └── deploy.yml
└── docker-compose.yml

```

---

## 🗄️ Database Management & Verification

To verify that data is persisting inside the MySQL container, query the database directly:

```bash
sudo docker exec -it todo_mysql mysql -u todo_user -ppassword123 todo_db -e "SELECT * FROM todos;"

```

---

## 🔄 CI/CD Automation

Automated deployments are powered by GitHub Actions (`.github/workflows/deploy.yml`). On every `push` to the `master` branch:

1. Pipelines build local containers inside the runner and execute pre-deploy health checks against `/health`.
2. Upon passing, GitHub Actions connects via SSH to the AWS EC2 instance.
3. The server pulls the latest code, executes `docker compose up -d --build`, and cleans unneeded images.

### Configured Secrets Required

Add the following secrets in GitHub (**Settings > Secrets and variables > Actions**):

* `EC2_HOST`: Public IP of the EC2 instance.
* `EC2_USERNAME`: `ubuntu`
* `EC2_SSH_KEY`: Contents of your SSH `.pem` private key.
