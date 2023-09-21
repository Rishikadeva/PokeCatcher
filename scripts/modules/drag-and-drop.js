export function makeblock_Droppable() {
    const draggableBlockElements = document.querySelectorAll('.draggable');
    draggableBlockElements.forEach(function (item) {
        item.addEventListener('dragstart', dragstartEventhandler, false);
        item.addEventListener('dragend', dragendEventhandler, false);
    });
    const droppableBlockElements = document.querySelectorAll('.droppable');
    droppableBlockElements.forEach(function (item) {
        item.addEventListener('dragenter', dragenterEventhandler, false);
        item.addEventListener('dragover', dragoverEventhandler, false);
        item.addEventListener('dragleave', dragleaveEventhandler, false);
        item.addEventListener('drop', dropEventhandler, false);
    });

    function dragstartEventhandler(event) {
        console.log("dragStart");
        event.dataTransfer.setData("text", event.target.dataset.instruction);
        event.dataTransfer.effectAllowed = 'copyMove';
    }
    function dragoverEventhandler(event) {
        console.log("dragOver");
        event.preventDefault();
    }
    function dragenterEventhandler(event) {
        console.log("dragEnter");
        if (event.currentTarget.classList.contains('droppable')) {
            event.currentTarget.classList.add("dashed-border");
        }
        event.preventDefault();
    }
    function dragleaveEventhandler(event) {
        console.log("dragLeave");
        event.currentTarget.classList.remove("dashed-border");
        event.preventDefault();
    }
    function dropEventhandler(event) {
        console.log("dropped the block");
        event.preventDefault();
        const dropZone = event.target;
        dropZone.classList.remove("dashed-border");
        var instruction = event.dataTransfer.getData("text");
        var draggedElement = document.querySelector("[data-instruction = " + instruction);
        var nodeCopy = draggedElement.cloneNode(true);
        if (dropZone.classList.contains('droppable')) {
            nodeCopy.classList.remove("draggable");
            nodeCopy.setAttribute('draggable', false);
            dropZone.appendChild(nodeCopy);
            dropZone.classList.remove("droppable");
            dropZone.draggable = 'true';
        } else
            console.error('code already exist on this line');
    }
    function dragendEventhandler(event) {
        console.log("dragEnd");
        event.dataTransfer.clearData();
        document.getElementsByClassName
    }
}