def selection_sort(array):
    '''Time O(n2)comparison + O(n) swaps
        Space O(1)'''
    if len(array) < 1:
        return
        
    least = min(array)
    print(f'array {array}')
    array.remove(least)

    #recursive call
    selection_sort(array)

    array.insert(0, least)
    print(f'sorted array {array}') 
    return array   

selection_sort([5, 16, 99, 12, 567, 23, 15, 72, 3])