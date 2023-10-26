<script>
    import { createEventDispatcher } from 'svelte';
    import { fade,slide,fly,draw,scale } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    const dispatch = createEventDispatcher();

    function close() {
        dispatch('close');
    }
</script>

<div in:fade={{ duration: 1500 }} out:slide={{ duration: 1000 }} on:click={close} on:keydown={(e) => { if(e.key === 'Escape') close(); }} class="fixed inset-0 bg-blue-900 bg-opacity-80">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-3xl text-3xl font-bold">
        <h1>채점결과</h1>
        <p>틀림ㅋㅋ</p>
    </div>
</div>

