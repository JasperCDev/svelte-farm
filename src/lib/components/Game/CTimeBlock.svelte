<script lang="ts">
    import type { TimeBlock } from "../../GameState/TimeBlock.svelte";
    import CGridObject from "./CGridObject.svelte";

    interface Props {
        obj: TimeBlock;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj} class="time-block">
    <div class="time-block"><p>${obj.displayTime}</p></div>
</CGridObject>

<style>
    div {
        container-type: inline-size;
        border: 1px solid red;
        height: 100%;
    }
    p {
        font-size: 4.5cqh;
    }
</style>
