document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Your message has been sent successfully!');
    // 실제 서버로 전송하는 로직이 필요할 경우, 이곳에 추가할 수 있습니다.
    this.reset();
});
