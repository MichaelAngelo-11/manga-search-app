# Manga Search App 

This project deploys a simple Dockerized manga search application across two web servers (`web-01` and `web-02`) and serves traffic through a load balancer (`lb-01`) using HAProxy. The load balancer distributes requests using the **round-robin** strategy.
The video demonstrating the app can be found at https://youtu.be/NW5QyV5-fx0 
The app can be found at https://github.com/MichaelAngelo-11/manga-search-app.git
---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MichaelAngelo-11/manga-search-app.git
cd manga-search-app
```

---

## 🛎️ Docker Hub Image

* **Repository:** [https://hub.docker.com/r/michaelangelo11/manga-search-app](https://hub.docker.com/r/michaelangelo11/manga-search-app)
* **Image Name:** `michaelangelo11/manga-search-app`
* **Tag:** `v1`

---

## 📚 Build Instructions (Local Image)

```bash
# Navigate into the web directory
cd web

# Build the Docker image locally
docker build -t michaelangelo11/manga-search-app:v1 .
```

---

## 🚧 Deployment using Docker Compose

Use the provided `docker-compose.yml` to spin up the services:

```bash
docker-compose up --build
```

This will:

* Build/load the web app image
* Spin up two web server containers (`web-01`, `web-02`)
* Spin up the HAProxy load balancer (`lb-01`)
* Set up a custom bridge network with static IP addresses

### Port Mapping

| Host Port | Container | Purpose                              |
| --------- | --------- | ------------------------------------ |
| 8080      | web-01    | Direct access to web server 1        |
| 8081      | web-02    | Direct access to web server 2        |
| 8082      | lb-01     | Access through HAProxy load balancer |

### SSH Access (Optional)

```bash
ssh ubuntu@localhost -p 2210  # lb-01
ssh ubuntu@localhost -p 2211  # web-01
ssh ubuntu@localhost -p 2212  # web-02
```

---

## 🪯 Load Balancer Configuration (HAProxy)

### File: `lb/haproxy.cfg`

```cfg
frontend http_front
    bind *:80
    default_backend http_back

backend http_back
    balance roundrobin
    server web1 web-01:80 check
    server web2 web-02:80 check
```

### Reloading HAProxy

If you modify `haproxy.cfg`, rebuild the container:

```bash
docker-compose up --build lb-01
```

Or restart only the load balancer:

```bash
docker restart lb-01
```

---

## 🔧 Run Instructions (Web Servers)

No environment variables or volumes are required for this app. The image is self-contained.

If running manually:

```bash
docker run -d -p 8080:80 --name web-01 michaelangelo11/manga-search-app:v1
```

---

## 🔍 Testing the Load Balancer

### Step-by-Step

1. Open browser and visit: [http://localhost:8082](http://localhost:8082)
2. Refresh the page multiple times.
3. Confirm that:

   * Responses alternate between web-01 and web-02
   * Logs from `docker logs web-01` and `docker logs web-02` show alternating traffic

### Optional Debug

To confirm which container served the request, you can log or display the hostname from within the app.

---

## 🔐 Security & Secrets Handling (Optional)

Avoid hardcoding API keys or secrets in the Docker image.

### Recommended:

* Use environment variables:

  ```bash
  docker run -e API_KEY=your_api_key ...
  ```
* Or use `.env` files with Docker Compose

Update your app to read from environment variables instead of hardcoded strings.

---

## 📄 Summary

* **Image:** [`michaelangelo11/manga-search-app:v1`](https://hub.docker.com/r/michaelangelo11/manga-search-app)
* **App:** Manga search app filtering manga by rating
* **Setup:** 2 web servers behind an HAProxy load balancer
* **Tested:** Round-robin load balancing working as expected
* **Improved:** Secure structure, containerized deployment, consistent networking

---

## 👤 Author

**Michael Angelo**

* GitHub: [@MichaelAngelo-11](https://github.com/MichaelAngelo-11)
* Docker Hub: [@michaelangelo11](https://hub.docker.com/u/michaelangelo11)

---

## 🔖 License

MIT License
