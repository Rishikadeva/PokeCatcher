var images = [];
var imageUrls = [
"./images/tile.svg",
"./images/wall.svg",
"./images/arrow_forward.svg",
"./images/arrow_right.svg",
"./images/arrow_backward.svg",
"./images/arrow_left.svg",
"./images/pokeball_big.svg",
];
for (let i=0; i<imageUrls.length; i++) {
    images.push(new Image());
    images[i].src = imageUrls[i]
}
const poke_Image = new Image();
export function generate_Grid(context, grid, pokeUrl) {
    poke_Image.src = pokeUrl;
    poke_Image.addEventListener("load", function(){
        const xUnit = 76;
        const yUnit = 80;
        const padding = 4;
        const nrRows= grid.length;
        const nrColumns = grid[0].length;
        
        for (let row = 0; row < nrRows; row++) {
            for (let col = 0; col < nrColumns; col++) {
                let gridElement = grid[row][col];
                switch (gridElement) {
                    case 0:
                        context.drawImage(images[0], col * xUnit, row * yUnit);
                        break;
                    case 1:
                        context.drawImage(images[1], col * xUnit, row * yUnit);
                        break;
                    case 2:
                        context.drawImage(images[0], col * xUnit, row * yUnit);
                        context.drawImage(poke_Image, col * xUnit + padding, row * yUnit + padding);
                        break;
                    case 3:
                        context.drawImage(images[0], col * xUnit, row * yUnit);
                        context.drawImage(images[2], col * xUnit + padding, row * yUnit + padding);
                        break;
                    case 4:
                        context.drawImage(images[0], col * xUnit, row * yUnit);
                        context.drawImage(images[3], col * xUnit + padding, row * yUnit + padding);
                        break;
                    case 5:
                        context.drawImage(images[0], col * xUnit, row * yUnit);
                        context.drawImage(images[4], col * xUnit + padding, row * yUnit + padding);
                        break;
                    case 6:
                        context.drawImage(images[0], col * xUnit, row * yUnit);
                        context.drawImage(images[5], col * xUnit + padding, row * yUnit + padding);
                        break;
                    case 7:
                        context.drawImage(images[0], col * xUnit, row * yUnit);
                        context.drawImage(poke_Image, col * xUnit + padding, row * yUnit + padding);
                        context.drawImage(images[2], col * xUnit + padding, row * yUnit + padding);
                        break;
                    case 8:
                        context.drawImage(images[0], col * xUnit, row * yUnit);
                        context.drawImage(poke_Image, col * xUnit + padding, row * yUnit + padding);
                        context.drawImage(images[3], col * xUnit + padding, row * yUnit + padding);
                        break;
                    case 9:
                        context.drawImage(images[0], col * xUnit, row * yUnit);
                        context.drawImage(poke_Image, col * xUnit + padding, row * yUnit + padding);
                        context.drawImage(images[4], col * xUnit + padding, row * yUnit + padding);
                        break;
                    case 10:
                        context.drawImage(images[0], col * xUnit, row * yUnit);
                        context.drawImage(poke_Image, col * xUnit + padding, row * yUnit + padding);
                        context.drawImage(images[5], col * xUnit + padding, row * yUnit + padding);
                        break;
                    case 11:
                        context.drawImage(images[0], col * xUnit, row * yUnit);
                        context.drawImage(images[6], col * xUnit + padding+4, row * yUnit + padding+4);
                        break;
                    default:
                        context.drawImage(images[0], col * xUnit, row * yUnit);
                }
            }
        }
    });
   
}