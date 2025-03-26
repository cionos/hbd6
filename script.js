<!-- 标题固定在顶部 -->
    <div class="header">
        <h1 class="fancy-title">HAPPY ASA DAY</h1>
    </div>

    <!-- 粒子动画背景 -->
    <div id="particles-js"></div>

    <!-- 主容器 -->
    <div class="container">
        <!-- 内容区域 -->
    </div>

    <!-- 照片墙 -->
    <div class="photo-gallery">
        <img src="photo1.jpg" alt="回忆1">
        <img src="photo2.jpg" alt="回忆2">
        <img src="photo3.jpg" alt="回忆3">
    </div>

    <!-- 轮播图 -->
    <div class="slideshow-container">
        <div class="slide fade">
            <img src="slide1.jpg" alt="Slide 1">
        </div>
        <div class="slide fade">
            <img src="slide2.jpg" alt="Slide 2">
        </div>
    </div>

    <!-- 互动按钮 -->
    <div class="interaction-section">
        <button id="like-btn" class="vintage-button">❤️ 点赞 (<span id="like-count">0</span>)</button>
        <button id="danmu-btn" class="vintage-button">🎆 弹幕</button>
        <button id="chat-toggle" class="vintage-button">💬 聊天</button>
    </div>

    <!-- 弹幕区 -->
    <div id="danmu-input-container">
        <div id="danmu-container"></div>
        <div class="input-group">
            <input type="text" id="danmu-input" placeholder="输入弹幕...">
            <button id="danmu-send" class="star-btn"></button>
        </div>
    </div>

    <!-- 聊天室 -->
    <div id="chat-box-container">
        <div id="chat-box"></div>
        <div class="input-group">
            <input type="text" id="chat-input" placeholder="输入消息">
            <button id="chat-send" class="star-btn"></button>
        </div>
    </div>

    <!-- 音乐播放器 -->
    <audio id="music" src="birthday.mp3" loop></audio>
    <button class="music-btn">🎵</button>

    <!-- 特效容器 -->
    <div id="special-effect"></div>

    <script>
        // JavaScript部分
        // 音乐控制
        const music = document.getElementById('music');
        const musicBtn = document.querySelector('.music-btn');
        let musicInitialized = false;

        musicBtn.addEventListener('click', function() {
            if (!musicInitialized) {
                music.volume = 0.3;
                music.load();
                musicInitialized = true;
            }
            
            music.play().catch(e => {
                alert('请点击确定后再次点击音乐按钮');
            }).then(() => {
                if (music.paused) {
                    music.play();
                    musicBtn.textContent = '🔊';
                } else {
                    music.pause();
                    musicBtn.textContent = '🎵';
                }
            });
        });

        // 点赞功能
        let likeCount = 0;
        document.getElementById("like-btn").addEventListener("click", function() {
            likeCount++;
            document.getElementById("like-count").textContent = likeCount;
            
            // 从上往下飘的爱心
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = '0';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.color = `hsl(${Math.random() * 60 + 330}, 100%, 70%)`;
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
            
            // 417赞触发蛋糕特效
            if(likeCount === 417) {
                const cake = document.createElement('div');
                cake.className = 'cake-effect';
                document.body.appendChild(cake);
                setTimeout(() => cake.remove(), 5000);
            }
        });

        // 点击屏幕兔子特效
        document.addEventListener('click', function(e) {
            const rabbit = document.createElement('div');
            rabbit.className = 'click-rabbit';
            rabbit.style.left = (e.clientX - 30) + 'px';
            rabbit.style.top = (e.clientY - 30) + 'px';
            document.body.appendChild(rabbit);
            setTimeout(() => rabbit.remove(), 1000);
        });

        // 星沙小兔满屏飘
        function createBunnyParticles() {
            for(let i = 0; i < 15; i++) {
                const bunny = document.createElement('div');
                bunny.className = 'bunny-particle';
                bunny.style.setProperty('--random-x', Math.random() * 2 - 1);
                bunny.style.setProperty('--random-y', Math.random() * 2 - 1);
                bunny.style.left = Math.random() * window.innerWidth + 'px';
                bunny.style.top = Math.random() * window.innerHeight + 'px';
                bunny.style.animationDuration = `${Math.random() * 10 + 10}s`;
                document.body.appendChild(bunny);
                
                setTimeout(() => {
                    bunny.remove();
                }, 15000);
            }
        }

        // 弹幕功能
        document.getElementById("danmu-btn").addEventListener("click", function() {
            const container = document.getElementById("danmu-input-container");
            container.style.display = container.style.display === "none" ? "block" : "none";
        });

        document.getElementById("danmu-send").addEventListener("click", function() {
            const input = document.getElementById("danmu-input");
            const text = input.value.trim();
            if (!text) return;

            const msg = document.createElement("div");
            msg.className = "danmu-msg";
            msg.textContent = text;
            document.getElementById("danmu-container").appendChild(msg);
            
            input.value = "";
            document.getElementById("danmu-container").scrollTop = 9999;
        });

        // 聊天室
        document.getElementById("chat-toggle").addEventListener("click", function() {
            const chat = document.getElementById("chat-box-container");
            chat.style.display = chat.style.display === "none" ? "block" : "none";
        });

        document.getElementById("chat-send").addEventListener("click", function() {
            const input = document.getElementById("chat-input");
            const text = input.value.trim();
            if (!text) return;

            const msg = document.createElement("div");
            msg.textContent = text;
            document.getElementById("chat-box").appendChild(msg);
            input.value = "";
            document.getElementById("chat-box").scrollTop = 9999;
        });

        // 轮播图
        let slideIndex = 0;
        showSlides();

        function showSlides() {
            const slides = document.getElementsByClassName("slide");
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
            }
            slideIndex++;
            if (slideIndex > slides.length) slideIndex = 1;
            slides[slideIndex-1].style.display = "block";
            setTimeout(showSlides, 3000);
        }

        // 粒子动画
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof particlesJS === 'function') {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 60 },
                        color: { value: "#ff4081" },
                        shape: { type: "circle" },
                        opacity: { random: true },
                        size: { random: true },
                        line_linked: { 
                            enable: true, 
                            distance: 150, 
                            color: "#ff4081", 
                            opacity: 0.4, 
                            width: 1 
                        },
                        move: { enable: true, speed: 3 }
                    }
                });
            }
            
            // 启动星沙小兔特效
            createBunnyParticles();
            setInterval(createBunnyParticles, 10000);
        });