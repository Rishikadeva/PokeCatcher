function genNumList(panelId, numOfLines) {
    let panel_cb = document.getElementById(panelId);
    let numList = document.createElement('ul');
    numList.classList.add('number-list');
    for (let i = 1; i <= numOfLines; ++i) {
        let listItem = document.createElement('li');
        listItem.innerHTML = i;
        numList.appendChild(listItem);
    }
    panel_cb.appendChild(numList);
}
function empty_Container(containerId){
    let container = document.getElementById(containerId);
    console.log(containerId)
    while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
}
//editorId:- main code or procedure code
function gen_lines(panelId, editorId, numOfLines) {
    empty_Container(panelId);
    let panel = document.getElementById(panelId);
    let func_Container = document.createElement('div');
    func_Container.id=editorId;
    func_Container.classList.add('code-zone');
    for (let i = 1; i <= numOfLines; ++i) {
        let code_line = document.createElement('div');
        code_line.classList.add('code-line');
        let contentOfline = document.createElement('div');
        contentOfline.classList.add('line-content');
        contentOfline.classList.add('droppable');

        let deleteLine = document.createElement('div');
        deleteLine.classList.add('delete-line');
        deleteLine.innerHTML = 'x';
        deleteLine.addEventListener("click", function () {
            let previousSibling = this.previousElementSibling;
            previousSibling.classList.add('droppable');
            previousSibling.innerHTML='';
        });

        code_line.appendChild(contentOfline);
        code_line.appendChild(deleteLine);
        func_Container.appendChild(code_line);
       
    }
    genNumList(panelId,numOfLines);
    panel.appendChild(func_Container);
}
export function codeEditorLines(mainLines, procLines){
    gen_lines('main-panel','main-code-container',mainLines);
    gen_lines('procedure-panel','procedure-code-container',procLines);
}