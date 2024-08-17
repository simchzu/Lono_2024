// 페이지가 로드될 때 실행되는 함수
window.addEventListener("load", function() {
    document.getElementById("main-screen").classList.remove("hidden");
    document.getElementById("analysis-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
});

// 메인 화면에서 업로드 버튼 클릭 시
document.getElementById("uploadButton").addEventListener("click", function() {
    document.getElementById("fileInput").click();
});

// 이미지 업로드 시 자동 분석 시작
document.getElementById("fileInput").addEventListener("change", function() {
    if (this.files.length > 0) {
        document.getElementById("main-screen").classList.add("hidden");
        document.getElementById("analysis-screen").classList.remove("hidden");
        startAnalysis();
    }
});

// 분석 시작 함수
function startAnalysis() {
    let progress = 0;
    const progressBar = document.getElementById("progress");

    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;
        document.getElementById("analysis-status").textContent = `Analyzing... ${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            showResults();
        }
    }, 500);
}

// 결과 화면 전환 함수
function showResults() {
    document.getElementById("analysis-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Old', 'Young'],
            datasets: [{
                label: 'Cell Proportions',
                data: [63.2, 34.8],
                backgroundColor: ['#3498db', '#2ecc71'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

// 분석 결과에서 재시작 버튼 클릭 시
document.getElementById("restartAnalysis").addEventListener("click", function() {
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");
});
