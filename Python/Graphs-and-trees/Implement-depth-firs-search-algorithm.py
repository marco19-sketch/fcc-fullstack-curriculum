print(f'\ndfs using recursion\n')

def dfs(matrix, node):
    '''
DFS (Depth-First Search) for graph traversal using recursion.

Parameters:
- matrix: Adjacency matrix representation of the graph
          0 = no connection, 1 = connection between nodes
          Example: [[0,1,0,0], [1,0,1,0], ...] means:
          Node 0 connects to node 1, node 1 connects to nodes 0 and 2, etc.
- node: Starting node index for the DFS traversal

Returns:
- List of node indices in the order they were visited (DFS order)

Algorithm Overview:
1. Uses recursion to implement depth-first traversal
2. Tracks visited nodes in a set to prevent cycles
3. For each node:
   a. Mark as visited and record in final order
   b. Recursively visit all unconnected neighbors
4. Follows "go deep first" strategy before exploring other branches

Example:
For graph: 0 -- 1 -- 2 -- 3
Starting at node 1 returns: [1, 0, 2, 3] or similar DFS order
'''
    
    visited = set()
    final = []
    # print(f'matrix[node]: {matrix[node]}')

    def dfs_helper(node):
        # print(f'matrix[node]: {matrix[node]}')
        if node in visited: # base case, when the algorithm visits a node for the 2nd time
            return
        visited.add(node)
        final.append(node)
        
        for i, edge in enumerate(matrix[node]):
            if edge == 1 and i not in visited: # if an edge exists and the node has not 
                dfs_helper(i)                  # been visited make the recursion call
        # print(f'visited: {visited}')
        # print(f'final: {final}')
    dfs_helper(node)
    print(f'final: {final}')
    print(f'visited: {visited}')
    return final

dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]], 1)  
dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]], 3)
dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], 3)
dfs([[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]], 3)
dfs([[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]], 0) 


print('#########################')

###################################
######### with stack LIFO #########
###################################

print(f'\ndfs with stack LIFO\n')
def dfs(matrix, node):
    '''
DFS (Depth-First Search) for graph traversal using an iterative stack-based approach.

Parameters:
- matrix: Adjacency matrix representation of the graph
          0 = no connection, 1 = connection between nodes
          Example: [[0,1,0,0], [1,0,1,0], ...] means:
          Node 0 connects to node 1, node 1 connects to nodes 0 and 2, etc.
- node: Starting node index for the DFS traversal

Returns:
- List of node indices in the order they were visited (DFS order)

Algorithm Overview:
1. Uses an explicit stack (LIFO) instead of recursion
2. Tracks visited nodes in a separate list to prevent cycles
3. While stack is not empty:
   a. Pop the top node from stack
   b. Process/record the node
   c. Push all unvisited neighbors onto the stack
4. Follows "go deep first" strategy - explores newest nodes first

Note: This iterative version avoids recursion depth limits and 
      gives more control over the traversal process.

Example:
For graph: 0 -- 1 -- 2 -- 3
Starting at node 1 returns: [1, 2, 3, 0] or similar DFS order
(Order may differ from recursive version due to stack push order)
'''
    # print(f'matrix[node]: {matrix[node]}')
    visited = [node]
    stack = [node]
    # print(f'starting stack: {stack}')
    reached = []
    
    while len(stack) != 0:
        popped = stack.pop()
        reached.append(popped)
        
        # print(f'stack after pop: {stack}')
        for i, edge in enumerate(matrix[popped]):
            if edge == 1 and i not in visited:
                stack.append(i)
                # print(f'stack after append: {stack}')
                visited.append(i)
                # print(f'visited: {visited}')
                # reached.append(i)
                # print(f'reached: {reached}')
    print(f'reached: {reached}')
    print(f'visited: {visited}')
    return reached

dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]], 1)  
dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]], 3)
dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], 3)
dfs([[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]], 3)
dfs([[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]], 0)