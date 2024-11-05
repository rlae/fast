let startTime, endTime;
let attempts = 0;
let totalReactionTime = 0;

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', restartGame); // 다시하기 버튼 이벤트 추가
document.getElementById('reaction-btn').addEventListener('click', recordReaction);

function startGame() {
    attempts = 0; // 시도 횟수 초기화
    totalReactionTime = 0; // 총 반응 시간 초기화
    document.getElementById('average-time').innerText = 0; // 평균 반응 시간 초기화
    document.getElementById('reaction-time').innerText = 0; // 반응 시간 초기화
    document.getElementById('message').innerText = ''; // 메시지 초기화
    document.getElementById('start-btn').style.display = 'none'; // 시작 버튼 숨기기
    document.getElementById('restart-btn').style.display = 'none'; // 다시하기 버튼 숨기기
    nextAttempt(); // 첫 번째 시도 시작
}

function nextAttempt() {
    if (attempts < 5) {
        document.getElementById('message').innerText = '준비하세요...';
        document.getElementById('reaction-btn').style.display = 'none';

        const randomDelay = Math.floor(Math.random() * 3000) + 2000;

        setTimeout(() => {
            document.getElementById('message').innerText = '지금 클릭하세요!';
            spawnButton(); // 버튼 생성 함수 호출
            startTime = Date.now(); // 현재 시간을 기록
        }, randomDelay);
    } else {
        endGame(); // 게임 종료
    }
}

function endGame() {
    document.getElementById('message').innerText = '게임 끝! 다시 시작하려면 버튼을 클릭하세요.';
    document.getElementById('reaction-btn').style.display = 'none'; // 버튼 숨기기
    document.getElementById('restart-btn').style.display = 'block'; // 다시하기 버튼 보이기
}

function restartGame() {
    startGame(); // 게임 재시작
}

function spawnButton() {
    const container = document.querySelector('.game-container');
    const button = document.getElementById('reaction-btn');

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    const randomX = Math.random() * (containerWidth - buttonWidth);
    const randomY = Math.random() * (containerHeight - buttonHeight);

    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    button.style.display = 'block'; // 버튼 보이기
}

function recordReaction() {
    endTime = Date.now(); // 클릭 시 현재 시간을 기록
    const reactionTime = endTime - startTime; // 반응 시간 계산
    totalReactionTime += reactionTime;
    attempts++;
    document.getElementById('reaction-time').innerText = reactionTime; // 반응 시간 표시

    if (attempts === 5) {
        const averageTime = totalReactionTime / attempts;
        document.getElementById('average-time').innerText = Math.round(averageTime); // 평균 반응 시간 표시
        endGame(); // 게임 종료
    } else {
        document.getElementById('message').innerText = `다음 시도를 위해 준비하세요... (시도 횟수: ${attempts})`;
        document.getElementById('reaction-btn').style.display = 'none'; // 버튼 숨기기
        nextAttempt(); // 다음 게임 시도 시작
    }
}
