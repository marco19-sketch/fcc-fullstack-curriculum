def dfs_n_queens(n):
    # Edge case: if n < 1, there are no solutions
    if n < 1:
        return []

    # Lists to keep track of occupied diagonals and columns
    diag_back = []   # backward diagonals (row - col)
    diag_forw = []   # forward diagonals (row + col)
    col = []         # column positions of queens by row
    solutions = []   # list to store all valid solutions

    def dfs_helper(row):
        # row: current row we are trying to place a queen in
        print(f'len-col: {len(col)} -- row: {row}')

        # Base case: all rows are filled
        if row == n:
            # Save a copy of the current solution
            solutions.append(col.copy())
            print(solutions)
            return

        # Try placing a queen in each column of the current row
        for i in range(n):
            # Check if placing a queen here is safe:
            # - column not used
            # - backward diagonal not used
            # - forward diagonal not used
            if i not in col and (i - row) not in diag_back and (i + row) not in diag_forw:
                # Place the queen
                col.append(i)
                diag_forw.append(i + row)
                diag_back.append(i - row)

                # Recurse to the next row
                dfs_helper(row + 1)
                
                # Debug: show current state before undo
                print(f'col {col}\ndiag-forw {diag_forw}\ndiag_back {diag_back}')

                # Undo the move (backtrack) to try next column
                col.pop()
                diag_forw.pop()
                diag_back.pop()
    
    # Start recursion from the first row (row 0)
    dfs_helper(0)

    # Final list of all solutions
    print(f'solutions: {solutions}')
    return solutions

# Test the function for n = 4
dfs_n_queens(4)

print(len(dfs_n_queens(8)))