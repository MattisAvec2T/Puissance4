const gridColumns = document.querySelectorAll("#columns .column");
const prompt = document.querySelector("#prompt");
var playerTurn = "red";

function mouseEnterColumn(e) {
    let gridColumn = e.target;
    gridColumn.innerHTML += `
        <div class="hovering">
            <svg>
                <rect x="2.5" y="2.5" height="595" width="95"
                    fill="#ffffff15"  stroke="${playerTurn}" stroke-width="5" stroke-dasharray="23 26" stroke-linecap="round" rx="5" />
            </svg>
        </div>
    `;
}

function mouseLeaveColumn(e) {
    let gridColumn = e.target;
    if (gridColumn.querySelector(".hovering")) {
        gridColumn.removeChild(gridColumn.querySelector(".hovering"));
    }
}

function clickColumn(e) {
    let gridColumn = e.target.parentNode.parentNode.parentNode;

    // Check if column is full
    if (gridColumn.children.length > 6) {
        return;
    }

    // Add the piece to add
    let pieceToAdd = document.createElement("svg");
    pieceToAdd.classList.add(playerTurn);
    pieceToAdd.setAttribute("viewBox", "0 0 90 90");
    let circle = document.createElement("circle");
    circle.setAttribute("cx", 45);
    circle.setAttribute("cy", 42);
    circle.setAttribute("r", 40);
    circle.setAttribute("fill", playerTurn);
    pieceToAdd.appendChild(circle)
    gridColumn.prepend(pieceToAdd);

    // Refresh the added piece (if this part is not added, the piece won't be shown in case of a winning play) /!\ POBLEM MOST LIKELY DUE TO <svg> or <circle>
    gridColumn.innerHTML += `
        <div class="hovering">
            <svg>
                <rect x="2.5" y="2.5" height="595" width="95"
                    fill="#ffffff15"  stroke="${playerTurn}" stroke-width="5" stroke-dasharray="23 26" stroke-linecap="round" rx="5" />
            </svg>
        </div>
    `;
    gridColumn.removeChild(gridColumn.querySelector(".hovering"));

    // Animation Between turns
    let timer = 1;
    fallingPiece(pieceToAdd, timer);
    
    deleteEventListener();
    
    // Delete hover element to get the complete grid without the ".hovering" element
    gridColumn.removeChild(gridColumn.querySelector(".hovering"));
    winCheck(gridColumn);
    
    // Change the player turn
    switch (playerTurn) {
        case "red" :
            playerTurn = "yellow";
            break;
        case "yellow" :
            playerTurn = "red";
            break;
    };
    setTimeout(() => {
        prepareEventListener();
    }, 100);
}

function gridColumnEventsListener(element) {
    element.addEventListener("mouseenter", mouseEnterColumn);
    element.addEventListener("mouseleave", mouseLeaveColumn);
    element.addEventListener("click", clickColumn);
}

function prepareEventListener() {
    gridColumns.forEach(gridColumnEventsListener);
}

function deleteGridColumnEventsListener(element) {
    element.removeEventListener("click", clickColumn);
}

function deleteEventListener() {
    gridColumns.forEach(deleteGridColumnEventsListener);
}

function fallingPiece(piece, timer) {
    // piece.classList.value = playerTurn
    
    // piece.classList.add("");
}

function winCheck(column) {
    grid = gridArray();
    winConditions(grid, column);
}

function gridArray() {
    let grid = new Array;
    for (let gridColumn of gridColumns) {
        let column = new Array;
        if (gridColumn.children.length > 0) {
            if (gridColumn.children.length > 1) {
                for (let columnRow of gridColumn.children) {
                    column.unshift(columnRow.classList.value);
                }
            } else {
                column.unshift(gridColumn.firstChild.classList.value);
            }
        } while (column.length < 6) {
            column.push(false);
        }
        grid.push(column);
    }
    return grid
}

// RETIRER LES RETURN (plusieurs p4 possibles)
function winConditions(grid, column) {
    let columnNumber = parseInt(column.id.slice(-1)) - 1;
    let rowNumber = column.children.length - 1;
    let winPattern = [`${playerTurn}`, `${playerTurn}`, `${playerTurn}`, `${playerTurn}`]
    // Vertical check
    let verticalAxis = grid[columnNumber];
    let verticalCheck = verticalAxis.join("|").includes(winPattern.join("|"));

    if (verticalCheck == true) {
        console.log(verticalCheck);
    };

    // Horizontal check
    let horizontalAxis = [grid[0][rowNumber], grid[1][rowNumber], grid[2][rowNumber], grid[3][rowNumber], grid[4][rowNumber], grid[5][rowNumber], grid[6][rowNumber]];
    let horizontalCheck = horizontalAxis.join("|").includes(winPattern.join("|"));
    
    if (horizontalCheck == true) {
        console.log(horizontalCheck);
    };

    // Diagonal 1 (/) check
    let diagonal1Axis = new Array;
    if (columnNumber-3 < 0 || rowNumber-3 < 0 || columnNumber-3 > 6 || rowNumber-3 > 5) {
        diagonal1Axis.push(false);
    } else {
        diagonal1Axis.push(grid[columnNumber-3][rowNumber-3])
    }
    if (columnNumber-2 < 0 || rowNumber-2 < 0 || columnNumber-2 > 6 || rowNumber-2 > 5) {
        diagonal1Axis.push(false);
    } else {
        diagonal1Axis.push(grid[columnNumber-2][rowNumber-2])
    }
    if (columnNumber-1 < 0 || rowNumber-1 < 0 || columnNumber-1 > 6 || rowNumber-1 > 5) {
        diagonal1Axis.push(false);
    } else {
        diagonal1Axis.push(grid[columnNumber-1][rowNumber-1])
    }
    diagonal1Axis.push(grid[columnNumber][rowNumber])
    if (columnNumber+1 < 0 || rowNumber+1 < 0 || columnNumber+1 > 6 || rowNumber+1 > 5) {
        diagonal1Axis.push(false);
    } else {
        diagonal1Axis.push(grid[columnNumber+1][rowNumber+1])
    }
    if (columnNumber+2 < 0 || rowNumber+2 < 0 || columnNumber+2 > 6 || rowNumber+2 > 5) {
        diagonal1Axis.push(false);
    } else {
        diagonal1Axis.push(grid[columnNumber+2][rowNumber+2])
    }
    if (columnNumber+3 < 0 || rowNumber+3 < 0 || columnNumber+3 > 6 || rowNumber+3 > 5) {
        diagonal1Axis.push(false);
    } else {
        diagonal1Axis.push(grid[columnNumber+3][rowNumber+3])
    }
    let diagonal1Check = diagonal1Axis.join("|").includes(winPattern.join("|"));

    if (diagonal1Check == true) {
        console.log(diagonal1Check);
    };

    // Diagonal 2 (\) check
    
    let diagonal2Axis = new Array;
    if (columnNumber-3 < 0 || rowNumber+3 < 0 || columnNumber-3 > 6 || rowNumber+3 > 5) {
        diagonal2Axis.push(false);
    } else {
        diagonal2Axis.push(grid[columnNumber-3][rowNumber+3])
    }
    if (columnNumber-2 < 0 || rowNumber+2 < 0 || columnNumber-2 > 6 || rowNumber+2 > 5) {
        diagonal2Axis.push(false);
    } else {
        diagonal2Axis.push(grid[columnNumber-2][rowNumber+2])
    }
    if (columnNumber-1 < 0 || rowNumber+1 < 0 || columnNumber-1 > 6 || rowNumber+1 > 5) {
        diagonal2Axis.push(false);
    } else {
        diagonal2Axis.push(grid[columnNumber-1][rowNumber+1])
    }
    diagonal2Axis.push(grid[columnNumber][rowNumber])
    if (columnNumber+1 < 0 || rowNumber-1 < 0 || columnNumber+1 > 6 || rowNumber-1 > 5) {
        diagonal2Axis.push(false);
    } else {
        diagonal2Axis.push(grid[columnNumber+1][rowNumber-1])
    }
    if (columnNumber+2 < 0 || rowNumber-2 < 0 || columnNumber+2 > 6 || rowNumber-2 > 5) {
        diagonal2Axis.push(false);
    } else {
        diagonal2Axis.push(grid[columnNumber+2][rowNumber-2])
    }
    if (columnNumber+3 < 0 || rowNumber-3 < 0 || columnNumber+3 > 6 || rowNumber-3 > 5) {
        diagonal2Axis.push(false);
    } else {
        diagonal2Axis.push(grid[columnNumber+3][rowNumber-3])
    }
    let diagonal2Check = diagonal2Axis.join("|").includes(winPattern.join("|"));

    if (diagonal2Check == true) {
        console.log(diagonal2Check);
    };
    console.log(verticalAxis, verticalCheck, horizontalAxis, horizontalCheck, diagonal1Axis, diagonal1Check, diagonal2Axis, diagonal2Check);
    if (verticalCheck == true || horizontalCheck == true || diagonal1Check == true || diagonal2Check == true) {
        console.log(playerTurn);
        prompt.innerHTML = `
            <span>
                <p class="${playerTurn}">
                    ${playerTurn} won
                </p>
            </span>
            `;
        prompt.classList.add("active");
        return
    } else if (!grid[0].includes(false) && !grid[1].includes(false) && !grid[2].includes(false) && !grid[3].includes(false) && !grid[4].includes(false) && !grid[5].includes(false) && !grid[6].includes(false)) {
        prompt.innerHTML = `
            <span>
                <p>
                    Draw
                </p>
            </span>
            `;
        prompt.classList.add("active");
    }
}

prepareEventListener()