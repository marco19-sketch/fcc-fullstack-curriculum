def adjacency_list_to_matrix(adj_list):   
    matrix = []
    nodes = len(adj_list)
    for value in adj_list.values():
        row = []
        for i in range(0, nodes):
            if i in value:
                row.append(1)
            else:
                row.append(0)
        print(row)
        matrix.append(row)
    print(matrix)
    return matrix

adjacency_list_to_matrix({0: [1, 2], 1: [2], 2: [0, 3], 3: [2]})