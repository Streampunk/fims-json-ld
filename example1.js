var jsonld = require('jsonld');

var CONTEXTS = {
    "http://repository-server/contextOriginal": {
        "@context": {
            "dc": "http://purl.org/dc/elements/1.1/",
            "default": "urn:ebu:metadata-schema:ebuCore_2012",
            "ebu": "http://ebu.org/nar-extensions/",
            "ebucore": "http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#",
            "esc": "http://www.eurovision.com#",
            "fims": "http://fims.tv#",
            "owl": "http://www.w3.org/2002/07/owl#",
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "skos": "http://www.w3.org/2004/02/skos/core#",
            "xsd": "http://www.w3.org/2001/XMLSchema#",
            "xsi": "http://www.w3.org/2001/XMLSchema-instance"
        }
    },
    "http://repository-server/contextSimplified": {
        "@context": {
            "dc": "http://purl.org/dc/elements/1.1/",
            "default": "urn:ebu:metadata-schema:ebuCore_2012",
            "ebu": "http://ebu.org/nar-extensions/",
            "ebucore": "http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#",
            "esc": "http://www.eurovision.com#",
            "fims": "http://fims.tv#",
            "owl": "http://www.w3.org/2002/07/owl#",
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "skos": "http://www.w3.org/2004/02/skos/core#",
            "xsd": "http://www.w3.org/2001/XMLSchema#",
            "xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "dateCreated": {
                "@id": "ebucore:dateCreated",
                "@type": "xsd:dateTime"
            },
            "dateModified": {
                "@id": "ebucore:dateModified",
                "@type": "xsd:dateTime"
            },
            "hasDescriptiveMetadata": {
                "@id": "ebucore:hasDescriptiveMetadata",
                "@type": "@id"
            },
            "hasPart": {
                "@id": "ebucore:hasPart",
                "@type": "@id"
            },
            "id": "@id",
            "type": "@type",
            "BMContent": "ebucore:BMContent",
            "label": "rdfs:label"
        }
    }
};

//// FOLLOWING SECTION IS COPIED FROM THE QUICK EXAMPLE SECTION ON: https://github.com/digitalbazaar/jsonld.js/
//// BASICALLY ALLOWS US TO SPECIFY CACHED CONTEXTS LIKE THE ONES ABOVE, SO IT DOESNT TRY TO FETCH IT.

// grab the built-in node.js doc loader
var nodeDocumentLoader = jsonld.documentLoaders.node();
// or grab the XHR one: jsonld.documentLoaders.xhr()
// or grab the jquery one: jsonld.documentLoaders.jquery()

// change the default document loader using the callback API
// (you can also do this using the promise-based API, return a promise instead
// of using a callback)
var customLoader = function (url, callback) {
    if (url in CONTEXTS) {
        return callback(
            null, {
                contextUrl: null, // this is for a context via a link header
                document: CONTEXTS[url], // this is the actual document that was loaded
                documentUrl: url // this is the actual context URL after redirects
            });
    }
    // call the underlining documentLoader using the callback API.
    nodeDocumentLoader(url, callback);
    /* Note: By default, the node.js document loader uses a callback, but
    browser-based document loaders (xhr or jquery) return promises if they
    are supported (or polyfilled) in the browser. This behavior can be
    controlled with the 'usePromise' option when constructing the document
    loader. For example: jsonld.documentLoaders.xhr({usePromise: false}); */
};
jsonld.documentLoader = customLoader;

//// END OF COPIED SECTION


var bmContentOriginal = {
    "@context": "http://repository-server/contextOriginal",
    "@id": "http://repository-server/BMContent/2083",
    "@type": "ebucore:BMContent",
    "ebucore:dateCreated": {
        "@type": "xsd:dateTime",
        "@value": "2015-05-23T21:00:00"
    },
    "ebucore:dateModified": {
        "@type": "xsd:dateTime",
        "@value": "2015-05-23T21:00:00"
    },
    "ebucore:hasDescriptiveMetadata": {
        "@id": "http://repository-server/DescriptiveMetadata/2083"
    },
    "ebucore:hasPart": [
        {
            "@id": "http://repository-server/BMContent/2083_00_00_00"
        },
        {
            "@id": "http://repository-server/BMContent/2083_01_06_16"
        },
        {
            "@id": "http://repository-server/BMContent/2083_01_07_05"
        },
        {
            "@id": "http://repository-server/BMContent/2083_00_10_07"
        }
    ],
    "rdfs:label": [
        "Song contest",
        "2015",
        "Eurovision"
    ]
}

module.exports = {
    run: function () {
        console.log("========== EXAMPLE 1 ==========")

        jsonld.compact(bmContentOriginal, "http://repository-server/contextSimplified", function (err, simplified) {
            if (err) {
                console.error(err);
            }
            console.log("Original -> Simplified:\n")

            console.log(JSON.stringify(simplified, null, 4));

            console.log("\nExtracting specific fields from json object with dot notation:")
            console.log("id:          " + simplified.id);
            console.log("type:        " + simplified.type);
            console.log("label:       " + simplified.label);
            console.log("dateCreated: " + simplified.dateCreated);

            console.log("\n");

            jsonld.compact(simplified, "http://repository-server/contextOriginal", function (err, original) {
                console.log("Simplified -> Original:")
                console.log(JSON.stringify(original, null, 4));
                console.log("\n");
            });
        });
    }
}

