def fibonacci(n):
    # Calculates the n-th Fibonacci number using Dynamic Programming (bottom-up)
    # Stores intermediate values in a list to avoid redundant calculations.

    sequence = [0, 1]
    # print(sequence)
    if n == 0:
        return 0
    if n == 1:
        return 1

    for i in range(2, n + 1):
        # print(f'i {i}')
        sequence.append(sequence[i - 2] + sequence[i - 1])
        # print(sequence)
    return sequence[n]


print(fibonacci(10))
