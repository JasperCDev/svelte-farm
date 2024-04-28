<script lang="ts">
  import { farmLand } from "./lib/GameState/FarmLand.svelte";
  import CGrid from "./lib/components/CGrid.svelte";

  function getCursor() {
    switch (farmLand.selectedTool) {
      case "cursor":
        return "auto";
      case "mover":
        return "move";
    }
  }
</script>

<main
  class="main"
  style="
    cursor: {getCursor()};
  "
>
  <CGrid />
</main>

<style>
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: black;
  }
</style>
