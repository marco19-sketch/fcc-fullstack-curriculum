def gen_parentheses(pairs):
    """
    Generate all valid combinations of n pairs of parentheses.
    Example: For n=2, returns ['(())', '()()']
    
    This is a BFS (Breadth-First Search) approach because:
    1. We use a QUEUE (First-In-First-Out data structure)
    2. We explore ALL possibilities level by level
    3. We complete ALL possibilities at current length before moving to longer strings

    Level 0: ['']
    Level 1: ['(']
    Level 2: ['((', '()']
    Level 3: ['(((', '(()', '()(']
    Level 4: ['((())', '(()()', '()(())', '()()()'] etc.
    """
    
    # Input validation
    if not isinstance(pairs, int):
        return 'The number of pairs should be an integer'
    if pairs < 1:
        return 'The number of pairs should be at least 1'
    
    # Initialize BFS queue
    # Each element: (current_string, opens_used, closes_used)
    # Starting with empty string, 0 opens used, 0 closes used
    queue = [('', 0, 0)]
    result = []  # Will store valid complete parentheses strings
    
    # BFS LOOP: Explore all possibilities level by level
    while queue:
        # Debug: Show current state of queue
        print(f'queue {queue}')
        
        # BFS CHARACTERISTIC: pop(0) takes from FRONT (FIFO)
        # This ensures we process shorter strings before longer ones
        current, opens_used, closes_used = queue.pop(0)
        
        # CHECK IF WE HAVE A COMPLETE STRING
        # Valid string must have exactly 2 * pairs characters
        if len(current) == 2 * pairs:
            result.append(current)  # Found a valid combination
        else:
            # BRANCH 1: Add '(' if we haven't used all opening parentheses
            # We can only use up to 'pairs' opening parentheses
            if opens_used < pairs:
                queue.append((current + '(', opens_used + 1, closes_used))
            
            # BRANCH 2: Add ')' if we have more opens than closes
            # This ensures we never have invalid closing parentheses
            if closes_used < opens_used:
                queue.append((current + ')', opens_used, closes_used + 1))
    
    return f'result {result}'

# Test the function
print(gen_parentheses(2))