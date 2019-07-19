import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as PathFinderActions from '../../actions/PathFinderActions';

function node(row,col) {
	this.pos = [row, col];
	this.row = row;
	this.col = col;
	
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.cost = 1;
	this.visited = false;
	this.closed = false;
	this.parent = null;
}

function heap() {
	return new BinaryHeap(function(node) {
		return node.f;
	});
}

function euclideanDistance(pos1, pos2) {
 return (Math.sqrt( (pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2));
}

class AStarSearchAlgorithm extends Component {	

	constructor(props) {
		super(props);
		let numRows = this.props.grid.length;
		let numCols = this.props.grid[0].length;
		let gridNodes = [];
		
		for (let row = 0; row < numRows; row++) {
			gridNodes[row] = [];
			for (let col = 0; col < numCols; col++) {
				gridNodes[row][col] = new node(row, col); 
			}
		}	

		this.state = {
			gridNodes: gridNodes,
		}
		
		this.beginSearch = this.beginSearch.bind(this);
		this.getNeighbours = this.getNeighbours.bind(this);
	}
	
	componentDidMount() {
		let results = this.beginSearch();
		
		if (results.length > 0) {
			for (let i = 0; i < results.length-1; i++) {
				let pos = [results[i][0], results[i][1]];
				setTimeout(this.props.changeGridCell, 0.500, pos, 3);
			}
			setTimeout(this.props.changeGridCell, 1.000, this.props.endPos, 1);	
			setTimeout(this.props.displayMessage, 1.000, "SUCCESS");
		}		
		else {
			setTimeout(this.props.changeGridCell, 1.000, this.props.startPos, 4);				
			this.props.displayMessage("FAILED");
		}
		setTimeout(this.props.finishPathFinding, 1.000);	
	}

	beginSearch() {
		let startingNode = new node(this.props.startPos[0], this.props.startPos[1]);
		let openHeap = heap();
		
		startingNode.closed = true;
		openHeap.push(startingNode);
	
		while (openHeap.size() > 0) {
			
			let currentNode = openHeap.pop();
			
			if (currentNode.pos.toString() === this.props.endPos.toString()) {
				let curr = currentNode;
				let returnPath = [];
				while (curr.parent) {
					returnPath.push(curr.pos);
					curr = curr.parent;
				}
				return returnPath.reverse();
			}
			
			if (currentNode.pos.toString() !== startingNode.pos.toString()) {
				setTimeout(this.props.changeGridCell, 0.500, currentNode.pos, 2);
			}
			
			currentNode.closed = true;
			let neighbours = this.getNeighbours(currentNode);
			
			for (let i = 0; i < neighbours.length; i++) {
				let neighbour = neighbours[i];
				if (neighbour.closed) {
					continue;
				}
				let g = currentNode.g + neighbour.cost;
				let visited = neighbour.visited;
				
				if (!visited || g < neighbour.g) {
					neighbour.visited = true;
					neighbour.parent = currentNode;
					neighbour.h = neighbour.h || euclideanDistance(neighbour.pos, this.props.endPos);
					neighbour.g = g;
					neighbour.f = neighbour.h + neighbour.g;
					if (!visited) {
						openHeap.push(neighbour);
					}
					else {
						openHeap.rescoreElement(neighbour);
					}
				}
			}
		}
		
		// If failed. 
		return [];
	}

	getNeighbours(currentNode) {
		let neighbours = [],
			row = currentNode.row,
			col = currentNode.col;

		// West
		if (this.state.gridNodes[row-1] && this.state.gridNodes[row-1][col]) {
			// Only add to neighbours to check if not an obstacle
			if(this.props.grid[row-1][col] !== -1) {
				neighbours.push(this.state.gridNodes[row-1][col]);
			}
		}
		
		// East
		if (this.state.gridNodes[row+1] && this.state.gridNodes[row+1][col]) {
			if (this.props.grid[row+1][col] !== -1) {
				neighbours.push(this.state.gridNodes[row+1][col]);
			}
		}
		
		// South
		if (this.state.gridNodes[row] && this.state.gridNodes[row][col-1]) {
			if (this.props.grid[row][col-1] !== -1) {
				neighbours.push(this.state.gridNodes[row][col-1]);
			}
		}
	
		// North
		if (this.state.gridNodes[row] && this.state.gridNodes[row][col+1]) {
			if (this.props.grid[row][col+1] !== -1) {	
				neighbours.push(this.state.gridNodes[row][col+1]);
			}
		}

		return neighbours;		
	}

	textFadeAway() {
		this.setState({
			displayFailureMessage: false,
		});
	}

	render() {
		return(
			<span>
			</span>
		)
    }
}

const mapStateToProps = state => {
    return {
        grid: state.PathFinderReducer.grid,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeGridCell: (position, newValue) => {
            return dispatch(PathFinderActions.changeGridCell(position, newValue));
        },
		
		finishPathFinding: () => {
			return dispatch(PathFinderActions.finishPathFinding());
		},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AStarSearchAlgorithm);



function BinaryHeap(scoreFunction) {
  this.content = [];
  this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
  push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);

    // Allow it to sink down.
    this.sinkDown(this.content.length - 1);
  },
  pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it bubble up.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.bubbleUp(0);
    }
    return result;
  },
  size: function() {
    return this.content.length;
  },
  rescoreElement: function(node) {
    this.sinkDown(this.content.indexOf(node));
  },
  sinkDown: function(n) {
    // Fetch the element that has to be sunk.
    var element = this.content[n];

    // When at 0, an element can not sink any further.
    while (n > 0) {

      // Compute the parent element's index, and fetch it.
      var parentN = ((n + 1) >> 1) - 1;
      var parent = this.content[parentN];
      // Swap the elements if the parent is greater.
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element;
        this.content[n] = parent;
        // Update 'n' to continue at the new position.
        n = parentN;
      }
      // Found a parent that is less, no need to sink any further.
      else {
        break;
      }
    }
  },
  bubbleUp: function(n) {
    // Look up the target element and its score.
    var length = this.content.length;
    var element = this.content[n];
    var elemScore = this.scoreFunction(element);

    while (true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) << 1;
      var child1N = child2N - 1;
      // This is used to store the new position of the element, if any.
      var swap = null;
      var child1Score;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N];
        child1Score = this.scoreFunction(child1);

        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore) {
          swap = child1N;
        }
      }

      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N];
        var child2Score = this.scoreFunction(child2);
        if (child2Score < (swap === null ? elemScore : child1Score)) {
          swap = child2N;
        }
      }

      // If the element needs to be moved, swap it, and continue.
      if (swap !== null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
      // Otherwise, we are done.
      else {
        break;
      }
    }
  }
};

