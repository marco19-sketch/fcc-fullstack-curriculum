def hanoi_solver(n): 
    a = list(reversed(range(1, n + 1, 1)))
    b = []
    c = []

    # rule 1: disk '1' moves always in the same direction
    # rule 2: make the only legal move between the other 2 rods

    # We group the three rods into a list so we can refer to them by index (0, 1, 2)
    # instead of hard-coding names like a, b, c in the logic.
    #
    # This allows us to:
    # - Track where disk 1 is using an index (pos_1)
    # - Move disk 1 cyclically using modulo arithmetic
    # - Select the "other two rods" generically, without conditionals
    #
    # In short: the rods list lets the algorithm follow the rules of Hanoi
    # using math (indexes and modulo) instead of special cases.
    rods = [a, b, c]
    # initial position of disk 1
    pos_1 = 0
    # moving direction of disk 1
    direction = + 1 if n % 2 == 0 else -1

    # as per request
    string = f'{str(a)} {str(b)} {str(c)}\n'
    # the loop will stop when all the disks are in the c rod
    while len(c) < n:
        # next position 
        next_pos = (pos_1 + direction) % 3
        #move disk 1
        rods[next_pos].append(rods[pos_1].pop())
        # print(str(a), str(b), str(c))
        string += f'{str(a)} {str(b)} {str(c)}\n'
     
        if len(rods[2]) == n:
            break
        # legal move
        i = rods[(next_pos + 1) % 3]
        j = rods[(next_pos + 2) % 3]
        if len(i) == 0:
            if len(j) > 0:
                i.append(j.pop())
        elif len(j) == 0:
            if len(i) > 0:
                j.append(i.pop())
        else:
            if i[-1] > j[-1]:
                i.append(j.pop())
            else:
                j.append(i.pop())
        # update pos_1
        pos_1 = next_pos
        
        string += f'{str(a)} {str(b)} {str(c)}\n'
    # cut the new line at the end 
    print(string[0:-1])
    return string[0:-1]

        
hanoi_solver(7)
