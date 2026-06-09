from collections import deque


def bfs_maze(maze):
    if not maze or not maze[0]:
        return -1

    rows = len(maze)
    cols = len(maze[0])

    # Check if start or end is blocked
    if maze[0][0] == 1 or maze[rows - 1][cols - 1] == 1:
        return -1

    # Directions: up, down, left, right
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    visited = [[False] * cols for _ in range(rows)]
    # print(visited)
    queue = deque()

    # Queue stores (row, col, distance)
    queue.append((0, 0, 1))  # Distance includes starting cell
    visited[0][0] = True
    # print(visited)
    while queue:
        row, col, dist = queue.popleft()

        # Check if reached destination
        if row == rows - 1 and col == cols - 1:
            print('row, col, dist', row, col, dist)
            return dist

        # Explore neighbors
        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc
            # print('new_row, new_col', new_row, new_col)
            # Check bounds and if cell is open and not visited
            if (
                0 <= new_row < rows
                and 0 <= new_col < cols
                and maze[new_row][new_col] == 0
                and not visited[new_row][new_col]
            ):
                visited[new_row][new_col] = True
                queue.append((new_row, new_col, dist + 1))

    return -1  # No path found
# Test case
maze1 = [[0, 0, 0, 0], [1, 1, 0, 1], [0, 0, 0, 0], [0, 1, 1, 0]]
print(bfs_maze(maze1))  # Should return 7 (shortest path length including start and end)

maze2 = [[0, 1, 0], [0, 1, 0], [0, 1, 0]]
print(bfs_maze(maze2))  # Should return -1 (no path)
