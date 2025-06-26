document.addEventListener('click', function(e) {
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.innerHTML = '❤️'; // 或者 '💖', '👍' 等其他 emoji

    // 初始位置在鼠标点击处
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';

    // 轻微的随机水平偏移，让效果更自然
    const xOffset = (Math.random() - 0.5) * 30;
    heart.style.transform = `translateX(${xOffset}px)`;

    document.body.appendChild(heart);

    // 动画结束后移除
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
});