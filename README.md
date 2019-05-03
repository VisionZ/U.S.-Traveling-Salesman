# U.S.-Traveling-Salesman
A JavaScript website that calculates and shows the order of travel
of the shortest path that visits up to 10 major U.S. cities (duplicates allowed).

Although the salesman problem has yet to be throughly solved in polynomial time, there are many ways to approximate accurate solutions. 
In here, we "solve" the traveling salesman problem through the orkish application of brute force, first creating a list
of all possible paths (permutations) and selecting the first path with the minimal overall distance.
