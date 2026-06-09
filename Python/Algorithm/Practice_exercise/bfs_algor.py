from collections import deque


def bfs_shortest_path(graph, start, target):
    """
    Find shortest path from start to target using BFS.

    Parameters:
    graph: Dictionary representing adjacency list
    start: Starting node
    target: Target node to find

    Returns:
    Number of edges in shortest path, or -1 if no path exists
    """
    # Your code here
    if start == target:
        return 0
    
    visited = set()
    queue = deque()
    
    visited.add(start)
    queue.append((start, 0))
    
    while queue:
        current_node, distance = queue.popleft()
        for neighbor in graph.get(current_node, []):
            if neighbor == target:
                return distance + 1
            
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, + 1))
    return - 1


# Test case 1: Simple graph
graph1 = {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "F"],
    "D": ["B"],
    "E": ["B", "F"],
    "F": ["C", "E"],
}
print(bfs_shortest_path(graph1, "A", "F"))  # Should return 2 (A->C->F or A->B->E->F)

# Test case 2: No path exists
graph2 = {"A": ["B"], "B": ["A"], "C": ["D"], "D": ["C"]}
print(bfs_shortest_path(graph2, "A", "C"))  # Should return -1

# Test case 3: Start equals target
print(bfs_shortest_path(graph1, "A", "A"))  # Should return 0
