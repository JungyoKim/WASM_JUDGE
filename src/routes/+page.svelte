<script>
import { onDestroy, onMount } from 'svelte';
import Modal from '../lib/Modal.svelte';
let showModal = false;

function toggleModal() {
    showModal = !showModal;
}
let editor;
let monaco;
let editorContainer;
let themeName = "ct";
onMount(async () => {
    monaco = (await import('./monaco')).default;
    import('monaco-themes/themes/Cobalt.json')
        .then(data => {
            monaco.editor.defineTheme(themeName, data);

            //모나코 에디터 속성값 설정
            const editor = monaco.editor.create(editorContainer,{
                theme: themeName,
                minimap: {
                    enabled: false,
                },
                scrollbar: {
                    vertical: 'hidden',
                    horizontal: 'hidden'
                },
                scrollBeyondLastLine: false,
                padding: {
                    top: 20
                },
            });

            //모나코 에디터 입력값 불러오기
            const content = localStorage.getItem('editorContent');

            //모니코 에디터 랜더링 시작
            const model = monaco.editor.createModel(content, 'python');
            editor.setModel(model);

            //모나코 에디터 변경값 로컬스토리지에 저장
            editor.onDidChangeModelContent(() => {
                const content = editor.getValue();
                localStorage.setItem('editorContent', content);
            });

            //모나코 에디터 창크기 바꿀시 자동 재랜더링
            window.addEventListener('resize', () => {
                editor.layout();
            });
            
    });

});

onDestroy(() => {
    monaco === null || monaco === void 0 ? void 0 : monaco.editor.getModels().forEach((model) => model.dispose());
    editor === null || editor === void 0 ? void 0 : editor.dispose();
});


</script>
<div class="flex justify-between bg-blue-600 font-bold text-2xl text-white p-3">
    <h1>웹 어셈블리 앙 기모찌 채점기</h1>
    <div>
    <button on:click={toggleModal} class="bg-custom px-2 rounded-xl hover:px-[100px] active:bg-orange-400">클라이언트 사이드 제출 버튼</button>
    <button on:click={toggleModal} class="bg-custom px-2 rounded-xl hover:px-[100px] active:bg-cyan-500">서버 사이드 제출 버튼</button>
</div>
</div>
<div class="flex flex-col xl:flex-row justify-between">
    <div class="overflow-auto bg-custom w-full h-full p-3 text-white font-bold">
        <p class="text-xl mb-1">문제설명</p>
        <p>
        경문고 급식실에 화재가 발생했다. 불을 끄기 위해서는 정확히 N리터 만큼의 물이 필요하다.<br>
        매점에서 1회용 물탱크를 정확히 N리터 만큼 구매하는데, 개수를 최대한 적게 구매하여 불을 소화시키려고 한다.<br>
        매점에서 판매하는 물탱크의 가격표는 다음과 같다.<br>
        물탱크의 종류는 6가지로, 500L,100L,50L,10L,5L,1L짜리가 있고,<br>
        리터당 가격은 모두 2000원이다.<br>
        또한, 매점에는 100만원 이상 구매했을 시에 사용이 가능한 쿠폰이 존재한다.<br>
        쿠폰은 이름이 모두 영어 대문자 한글자로 A부터 F까지 존재하고, A는 5%의 할인이 가능하고 알파벳 순서대로 1%씩 증가하는 구조이다.<br>
        이러한 쿠폰이 아니면 할인을 받지 못한다.<br>
        물탱크를 모두 구매했을때 나오는 영수증을 출력해보자.
        </p>
        <p class="text-xl mt-5 mb-1">입력형식</p>
        <p>
        첫번째 줄에 불을끄는데 필요한 물의 양 N이 주어진다.<br>
        두번째 줄에는 쿠폰의 이름이 주어진다.
        </p>
        <p class="text-xl mt-5 mb-1">출력형식</p>
        <p>
        영수증은 할인이 적용되었을 시 칸이 3개로 나누어지며,<br>
        할인이 적용되지 않았다면 칸 하나가 사라진다.<br>
        각 칸은 “=”를 20개로 나누어야한다.<br>
        첫번째 칸은 구입한 항목만 용량,수량,가격을 공백으로 구분하여 모두 출력한다.<br>
        마지막 칸은 총합과 그 값을 공백으로 구분하여 출력하고 다음줄에 총액과 그 값을 구분하여 출력한다.<br>
        할인 칸은 할인과 그 값을 공백으로 구분하여 출력한다.<br>
        모든 값에는 단위를 붙여야 한다.<br>
        용량 : L , 수량 : 개 , 가격 : 원 , 할인 : %<br>
        모든 값은 정수로 출력해야 한다.
        </p>
        <p class="text-xl mt-5 mb-1">입력조건</p>
        <p>
        N은 1 이상 1,000,000,000이하의 자연수이다.<br>
        쿠폰의 이름은 대소문자 영어 한글자 이상 두글자 이하로 주어진다.       
        </p>

        <div class="flex justify-start space-x-3">
        <div class="flex justify-center bg-blue-600 p-3 rounded-xl text-[8px] w-[280px] mt-5">
            <div>
                <p class="text-xl">입력예시1</p>
                <p class="text-sm">
                11149<br>
                A        
                </p>
            </div>
            <div class="ml-5">
            <p class="text-xl">출력예시1</p>
            <p>
                ====================<br>
                500L 22개 22000000원<br>
                100L 1개 200000원<br>
                10L 4개 80000원<br>
                5L 1개 10000원<br>
                1L 4개 8000원<br>
                ====================<br>
                할인 5%<br>
                ====================<br>
                총합 32개<br>
                총액 211831000원<br>
                ====================
            </p>
        </div>
            </div>
            <div class="flex justify-center bg-blue-600 p-3 rounded-xl text-[8px] w-[280px] mt-5">
                <div>
                    <p class="text-xl">입력예시2</p>
                    <p class="text-sm">
                    2580<br>
                    AA
                    </p>
                </div>
                <div class="ml-5">
                <p class="text-xl">출력예시2</p>
                <p>
                    ====================<br>
                    500L 5개 5000000원<br>
                    50L 1개 100000원<br>
                    10L 3개 60000원<br>
                    ====================<br>
                    총합 9개<br>
                    총액 5160000원<br>
                    ====================
                </p>
            </div>
                </div>
                <div class="flex justify-center bg-blue-600 p-3 rounded-xl text-[8px] w-[280px] mt-5">
                    <div>
                        <p class="text-xl">입력예시3</p>
                        <p class="text-sm">
                        2580<br>
                        d     
                        </p>
                    </div>
                    <div class="ml-5">
                    <p class="text-xl">출력예시3</p>
                    <p>
                        ====================<br>
                        500L 5개 5000000원<br>
                        50L 1개 100000원<br>
                        10L 3개 60000원<br>
                        ====================<br>
                        총합 9개<br>
                        총액 5160000원<br>
                        ====================
                    </p>
                </div>
                    </div>
        </div>
        
    </div>
    <div class="bg-white w-[2px] h-max-screen">

    </div>
    <div>
    <div class="container" bind:this={editorContainer} />

</div>
</div>

{#if showModal}
<Modal on:close={toggleModal}>
     <h1>Hello SvelteKit!</h1> 
     <p>This is a simple modal.</p> 
</Modal>
{/if}
<style>
    .container {
        width: 100vh;
        height: 100vh;
    }
</style>