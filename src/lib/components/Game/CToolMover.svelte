<script lang="ts">
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import type { ToolMover } from "../../GameState/ToolMover.svelte";
    import CGridObject from "./CGridObject.svelte";
    interface Props {
        obj: ToolMover;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="tool">
        <h3>Mover</h3>
    </div>
</CGridObject>

<style>
    .tool {
        background: red;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &.is-selected {
            outline: 5px solid red;
        }
    }
</style>
