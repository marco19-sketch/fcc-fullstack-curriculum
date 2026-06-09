from PIL import Image

def show_graph():
    img = Image.open('O(n-log-n).png')
    img.show()

def merge_sort(array):
    '''the merge sort method uses recursion to 
    divide the array until 
    Time complexity O(n log n): splitting (log n), merging O(n).
    Space complexity O(n)'''
    if len(array) <= 1: 
        return
    
    middle_point = len(array) // 2
    left_part = array[:middle_point]
    right_part = array[middle_point:]
    # print(f'left part {left_part}')
    # print(f'right part {right_part}')

    merge_sort(left_part)
    merge_sort(right_part)

    left_array_index = 0
    right_array_index = 0
    sorted_index = 0

    while left_array_index < len(left_part) and right_array_index < len(right_part):
        if left_part[left_array_index] < right_part[right_array_index]:
            array[sorted_index] = left_part[left_array_index]
            left_array_index += 1
            # print(f'merge {array}')
        else:
            array[sorted_index] = right_part[right_array_index]
            right_array_index += 1
            # print(f'merge {array}')
        sorted_index += 1

    while left_array_index < len(left_part):
        array[sorted_index] = left_part[left_array_index]
        left_array_index += 1
        sorted_index += 1
    
    while right_array_index < len(right_part):
        array[sorted_index] = right_part[right_array_index]
        right_array_index += 1
        sorted_index += 1


if __name__ == '__main__':
    numbers = [4, 10, 6, 14, 2, 1, 8, 5]
    print('Unsorted array: ')
    print(numbers)
    merge_sort(numbers)
    print('Sorted array: ')
    print(numbers)
    show_graph()