import random
from PIL import Image

def show_graph():
    img = Image.open('O(n-log-n).png')
    img.show()

def merge_sort(arr, depth=0):
    '''recursive algorithm, variable 'depth' is used to show the 
    recursion mechanism. Sorting logic after base case is
    split, compare, merge (extend);
     because unlike other sorting algorithm is not 
    sorting in place'''
    
    indent = ' ' * depth
    print(f'{indent}merge_sort called with: {arr}')
    # base case
    if len(arr) <= 1:
        # print(f'{indent}Base case reached: returning {arr}')
        return arr

    mid = len(arr) // 2
    print(f'{indent}Splitting: left = {arr[:mid]}, right = {arr[mid:]}')
    # print(f'mid: {mid}')
    # recursive calls continue until base case
    left = merge_sort(arr[:mid], depth + 2)
    # print(f'left: {left}')
    right = merge_sort(arr[mid:], depth + 2)
    # print(f'right: {right}')

    # after recursive calls end the call stack starts releasing 
    # left and right and compares them in the while loop
    sorted_list = []
    i = 0
    j = 0

###########while loop scope######################################
    while i < len(left) and j < len(right):
        # loop logic after split: append lower then extend with 
        # the other one
        if left[i] <= right[j]: # compares single values
            sorted_list.append(left[i]) # appends them
            print(f'sorted list append left: {left[i]}')
            i += 1
        else:
            sorted_list.append(right[j])
            print(f'sorted list append right: {right[j]}')
            j += 1
###################################################################

    sorted_list.extend(left[i:])
    print(f'{indent}Sorted list extend left: {left[i:]}')
    sorted_list.extend(right[j:])
    print(f'{indent}Sorted list extend right: {right[j:]}')

    print(f'{indent}Returning merged: {sorted_list}')
    return sorted_list
    # after the return the function keeps rolling because the call stack
    # is still returning calls !!
test = merge_sort([random.randint(1, 100) for _ in range(4)])
print(test)

show_graph()