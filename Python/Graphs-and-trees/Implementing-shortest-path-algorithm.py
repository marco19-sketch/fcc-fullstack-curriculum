# INF represents infinity (unreachable/very large distance)
INF = float('inf')

# Adjacency matrix representing weighted graph distances
# [row][col] shows distance from node 'row' to node 'col'
# 0 means same node, INF means no direct connection
adj_matrix = [
    [0, 5, 3, INF, 11, INF],    # Node 0 connections
    [5, 0, 1, INF, INF, 2],     # Node 1 connections
    [3, 1, 0, 1, 5, INF],       # Node 2 connections
    [INF, INF, 1, 0, 9, 3],     # Node 3 connections
    [11, INF, 5, 9, 0, INF],    # Node 4 connections
    [INF, 2, INF, 3, INF, 0],   # Node 5 connections
]

def shortest_path(matrix, start_node, target_node=None):
    """Find shortest paths from start_node to all/target nodes using Dijkstra's algorithm."""
    
    n = len(matrix)  # Number of nodes in the graph
    
    # distances[i] = shortest distance found so far from start_node to node i
    distances = [INF] * n
    distances[start_node] = 0  # Distance to self is 0
    
    # paths[i] = list of nodes forming shortest path from start_node to node i
    paths = [[node_no] for node_no in range(n)]
    
    # visited[i] = True if we've finalized shortest path to node i
    visited = [False] * n
    
    # Process all nodes (or until no reachable nodes left)
    for _ in range(n):
        # STEP 1: Find unvisited node with smallest known distance
        min_distance = INF
        current = -1  # Will hold the next node to process
        
        # Look through all nodes to find the smallest unvisited distance
        for node_no in range(n):
            # If node is unvisited AND has smaller distance than current minimum
            if not visited[node_no] and distances[node_no] < min_distance:
                min_distance = distances[node_no]
                current = node_no  # Mark this as our next node to process
        
        # If no unvisited nodes are reachable, we're done
        if current == -1:
            break
            
        # Mark this node as "visited" - we've finalized its shortest distance
        visited[current] = True
        
        # STEP 2: Update distances to neighbors of current node
        for node_no in range(n):
            # Get direct distance from current node to this neighbor
            distance = matrix[current][node_no]
            
            # Check if: 1) There's a direct connection, 2) Neighbor isn't visited
            if distance != INF and not visited[node_no]:
                # Calculate new possible distance through current node
                new_distance = distances[current] + distance
                
                # If new path is shorter than current best path
                if new_distance < distances[node_no]:
                    # Update shortest distance to this neighbor
                    distances[node_no] = new_distance
                    # Update path: path to current + this neighbor
                    paths[node_no] = paths[current] + [node_no]
    
    # STEP 3: Display results
    # Determine which nodes to show results for
    if target_node is not None:
        targets = [target_node]  # Show only specific target
    else:
        targets = range(n)  # Show all nodes
    
    # Print results for requested nodes
    for node_no in targets:
        # Skip start node or unreachable nodes
        if node_no == start_node or distances[node_no] == INF:
            continue
            
        # Convert path list to string format "0 -> 2 -> 4"
        string_path = (str(n) for n in paths[node_no])
        path = ' -> '.join(string_path)
        
        # Display the result
        print(f'\n{start_node}-{node_no} distance: {distances[node_no]}')
        print(f'Path: {path}')
    
    return distances, paths  # Return results for further use

# Find shortest paths from node 0 to all other nodes
shortest_path(adj_matrix, 0)