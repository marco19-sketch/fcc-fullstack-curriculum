def square_root_bisection(number, tolerance=0.1, maximum=8):
    if number < 0:
        raise ValueError('Square root of negative number is not defined in real numbers')
    if number == 0 or number == 1:
        print(f'The square root of {number} is {number}')
        return number
    
    if number < 1:
        high = 1
    else:
        high = number 
    low = 0
    square_target = (low + high) / 2
    iteration = 0
    

    while iteration < maximum:   
        # print(f'maximum {maximum}, iteration {iteration}')
        # print(f'tolerance {tolerance}')  
        # print(f'high - low = {high - low}')
        # if iteration == maximum:
        #     return f'Failed to converge within the {maximum} iterations'
        # print(f'square_target {square_target}')

        if abs(square_target - number**0.5) <= (tolerance /2):
            # print(f'square^2 range = {number} - half({tolerance}) = {number - tolerance / 2} **2 = {(number - tolerance / 2)**2}')
            # print(f'SOLUTION RANGE = {square_target - tolerance / 2} -- {square_target + tolerance / 2}')
            # print(f'{number} + {tolerance} = {number + tolerance}')
            print(f'The square root of {number} is approximately {square_target}') 
            return square_target

        elif square_target **2 > number:
            high = square_target
            # print(f' {square_target}^2 = {square_target **2} > number {number} - high -> square_target')
        else:
            low = square_target
            # print(f'{square_target}^2 = {square_target **2} < number {number} - low -> square_target')
        iteration += 1
        square_target = (low + high) / 2
        # print(f'iterations {iteration}')
        # print(f'square_target {square_target}')
        # print(f'target **2 = {square_target **2}')
    print(f'Failed to converge within {maximum} iterations')
    return None 
    

print(square_root_bisection(0.001, 1e-7, 50))