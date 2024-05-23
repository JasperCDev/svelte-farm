<script lang="ts">
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import type { Toolbar, Tool } from "../../GameState/Toolbar.svelte";
    import CGridObject from "./CGridObject.svelte";

    interface Props {
        obj: Toolbar;
    }
    let { obj }: Props = $props();

    function handleToolClick(e: MouseEvent, tool: Tool) {
        e.stopPropagation();
        farmLand.selectedTool = tool;
    }
</script>

<CGridObject gridObject={obj}>
    <div class="toolbar" style="--toolbar-count: {obj.tools.length}">
        {#each obj.tools as tool}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="tool"
                onclick={(e) => handleToolClick(e, tool)}
                class:is-selected={farmLand.selectedTool === tool}
            >
                <h3>{tool}</h3>
            </div>
        {/each}
    </div>
</CGridObject>

<style>
    .toolbar {
        display: grid;
        grid-template-columns: repeat(var(--toolbar-count), auto);
        width: 100%;
        height: 100%;
        background-color: white;
    }
    .tool {
        display: flex;
        justify-content: center;
        align-items: center;
        &.is-selected {
            outline: 5px solid red;
        }
    }
</style>
