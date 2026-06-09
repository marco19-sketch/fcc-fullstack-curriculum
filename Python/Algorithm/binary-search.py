from PIL import Image

def show_graph():
    img = Image.open('O(log-n).png')
    img.show()

def binary_search(list, target):
    '''time complexity O(log n) it grows with the length of the list, space complexity O(1)'''
    # low and high are indexes
    low = 0
    high = len(list) -1
    tries = 0

    while low <= high:
        mid = (low + high) // 2 # ex (50 + 100) // 2 == 75
        mid_value = list[mid] # value to compare to target
        tries += 1
        if mid_value == target:
            return f'Found {target} at index {mid} in {tries}  tries'
        elif mid_value < target: # [low......mid...target..high] -> [.mid...target....high]
            low = mid + 1    
        else:
            high = mid - 1 # -> [low...target...mid.]
    return f'Target {target} not found. Tries :{tries}'

numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50
]
numbers2 = list(range(1, 101))

show_graph()
test = binary_search(numbers, 2)
print(f'test 1: {test}')
test = binary_search(numbers2, 2)
print(f'test 2: {test}')
test = binary_search(list(range(1, 1001)), 2)
print(f'test 3: {test}')
test = binary_search(list(range(1, 10001)), 2)
print(f'test 4: {test}')
test = binary_search(list(range(1, 100001)), 2)
print(f'test 5: {test}')
test = binary_search(list(range(1, 10000001)), 2)
print(f'test 6: {test}')