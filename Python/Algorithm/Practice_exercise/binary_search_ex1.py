def bin_sear(sort_arr, target):
    low = 0
    high = len(sort_arr) - 1
    tries = 0

    while low <= high:
        mid = round((low + high) / 2)
        print('mid',mid, 'value =', sort_arr[mid])
        tries += 1 
        if sort_arr[mid] == target:
            return f'Target {target} found in {tries} tries.\n'
        if sort_arr[mid] < target:
            low = mid + 1
            print("low", low, 'value =', sort_arr[low], "\ntarget", target)

        elif sort_arr[mid] > target:
            high = mid - 1
            print("high", high,' value =', sort_arr[high], "\ntarget", target)

        else:
            return f'Target {target} not found.' 

    return - 1


# print(bin_sear(list(range(10)), 2))
# print(bin_sear(list(range(100)), 2))
# print(bin_sear(list(range(1000)), 2))

print(bin_sear([1, 3, 5, 7, 9, 11, 13], 7),'\n')  # Should return 3
print(bin_sear([1, 3, 5, 7, 9, 11, 13], 1), '\n')  # Should return 0
print(bin_sear([1, 3, 5, 7, 9, 11, 13], 13),'\n')  # Should return 6
print(bin_sear([1, 3, 5, 7, 9, 11, 13], 4),'\n')  # Should return -1
print(bin_sear([], 5))
