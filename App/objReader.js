function loadObjFile(data) {

	// TO DO:   (i) Parse OBJ file and extract vertices and normal vectors

    var lines = data.split("\n");

    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;
    var v_count = 0;
    var vertices = [];

    var vn_count = 0;
    var normals = [];

    var f_count = 0;
    var faces = [];
    
    var pointsArray = [];
    var normalsArray = [];

    for (var i = 0, line; line = lines[i]; i++) {
        
        var elements = line.split(/\s+/);
        switch (elements.shift()) {

            case "v":
                var v0 = parseFloat(elements[0]);
                var v1 = parseFloat(elements[1]);
                var v2 = parseFloat(elements[2]);
                var v3 = elements.length == 3 ? 1.0 : parseFloat(elements[3]);
                
                vertices.push(vec4(v0, v1, v2, v3));

                sumX += v0; sumY += v1; sumZ += v2;
                v_count++;
                break;

            case "vn":
                var v0 = parseFloat(elements[0]);
                var v1 = parseFloat(elements[1]);
                var v2 = parseFloat(elements[2]);
                var v3 = elements.length == 3 ? 0.0 : parseFloat(elements[3]);
                
                normals.push(vec4(v0, v1, v2, v3));
                vn_count++;
                break;

            case "f":
                var v0 = elements[0].split("/");
                var v1 = elements[1].split("/");
                var v2 = elements[2].split("/");
                
                faces.push([ v0, v1, v2 ]);
                f_count++;
                break;
        }
    }

    for (var i = 0, face; face = faces[i]; i++) {
        pointsArray.push(vertices[parseInt(face[0][0])-1]);
        pointsArray.push(vertices[parseInt(face[1][0])-1]);
        pointsArray.push(vertices[parseInt(face[2][0])-1]);

        normalsArray.push(normals[parseInt(face[0][2])-1]);
        normalsArray.push(normals[parseInt(face[1][2])-1]);
        normalsArray.push(normals[parseInt(face[2][2])-1]);
    }

    var centroid = vec4(sumX/v_count, sumY/v_count, sumZ/v_count, 1.0);
    
    console.log(normals[0]);

    console.log("nº vertices: " + v_count);
    console.log("nº normals: "  + vn_count);
    console.log("nº faces: "    + f_count);

	// TO DO:  (ii) If normal vectors are not in the file, you will need to calculate them


	// TO DO: (iii) Return vertices and normals and any associated information you might find useful
    return [ centroid, pointsArray, normalsArray ];
}