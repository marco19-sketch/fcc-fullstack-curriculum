def quick_sort(array):
    '''Time average/best O(n log n) worst O(n²) for comparison
        Space O(log n) best/average and O(n) worst case'''
    # print(f'array: {array}')
    if len(array) < 2:
        return array

    pivot = array[0]
    # print(f'\n\npivot {pivot}')
    smaller = []
    greater = []
    equal = []
    # print(f'Before for loop:\nless {smaller}\nequal: {equal}\ngreater {greater}')

    for n in array: 
        if n < pivot:
            smaller.append(n)
        elif n > pivot:
            greater.append(n)
        else:
            equal.append(n)
                
    # print(f'\n\nAfter the loop:\nsmaller: {smaller}\nequal:  {equal}\ngreater: {greater}')
    
    ########## core part ###############
    smaller = quick_sort(smaller)
    greater = quick_sort(greater) 
    # no need to sort equal elements
    ###################################

    # print(f'\n\nAfter recursion:\nsmaller {smaller}\nequal {equal}\ngreater{greater}')
    final = smaller + equal + greater
    print(f'FINAL {final}')
    return final
    
quick_sort([87, 11, 23, 18, 18, 23, 11, 56, 87, 56])
