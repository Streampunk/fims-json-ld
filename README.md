# fims-json-ld

This project contains a few examples and try outs with the jsonld.js library.

###Setting up your development environment

In order to run the examples on your computer you must have [node.js and npm](https://nodejs.org/en/download/) installed.

Although not mandatory it's practical to install [Visual Studio Code](https://code.visualstudio.com/Download) as well. Follow the [Hello World tutorial for node.js in Visual Studio Code](https://code.visualstudio.com/Docs/runtimes/nodejs) to get you started.

###Usage

Download or clone to project to your computer. Open the command line in the fims-json-ld folder. Run the following command to download and install the dependencies (jsonld and its dependencies).

```
npm install
```

Then you will be able to execute the examples by running 

```
npm start
```

or directly by calling node

```
node app.js
```

To run it inside Visual Studio Code, follow the node.js Hello World tutorial mentioned above. Modify app.js to select between the available examples.

This is tested and working with Node.js v6.9.4 and npm 3.10.10. But it should give no problems to run it with other versions since the examples are very basic.

## Examples

### Example 1

This example shows that you can change the presentation of a json-ld document by changing/extending the context. A json-ld document describing a BMContent that was generated from RDF is used as input. 

```javascript
{
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
```

By using the `jsonld.compact()` method we can change the representation to e.g. (check [example1.js](example1.js), for the contexts).

```javascript
{
    "@context": "http://repository-server/contextSimplified",
    "id": "http://repository-server/BMContent/2083",
    "type": "BMContent",
    "dateCreated": "2015-05-23T21:00:00",
    "dateModified": "2015-05-23T21:00:00",
    "hasDescriptiveMetadata": "http://repository-server/DescriptiveMetadata/2083",
    "hasPart": [
        "http://repository-server/BMContent/2083_00_00_00",
        "http://repository-server/BMContent/2083_01_06_16",
        "http://repository-server/BMContent/2083_01_07_05",
        "http://repository-server/BMContent/2083_00_10_07"
    ],
    "label": [
        "Song contest",
        "2015",
        "Eurovision"
    ]
}
```

By providing the original context again it will return again to it's initial form.

### Example 2

This example shows that embedding of resources is not an issue when using jsonld.js library. Using a BMContent with embedded Descriptive Metadata as input file:

```javascript
{
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
        "@type": "ebucore:DescriptiveMetadata",
        "ebucore:date": {
            "@type": "xsd:dateTime",
            "@value": "2015-05-23T21:00:00"
        },
        "ebucore:hasRelatedLink": {
            "@id": "http://www.Eurovision.tv/page/contest-details?event=2083"
        },
        "ebucore:identifier": {
            "@type": "xsd:anyURI",
            "@value": "2083"
        },
        "ebucore:title": "Eurovision Song Contest 2015 Grand Final",
        "esc:orderOk": {
            "@type": "xsd:boolean",
            "@value": "\n      1\n    "
        },
        "esc:resultsKnown": {
            "@type": "xsd:boolean",
            "@value": "\n      1\n    "
        },
        "esc:votingRules": {
            "@type": "xsd:string",
            "@value": "\n      Televoters and a professional jury in each country have a 50% stake in the outcome. The votes are revealed by spokespeople from all participating countries.\n    "
        }
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
```

With a different context this can be change to: 

```javascript
{
    "@context": "http://repository-server/contextEmbedded",
    "id": "http://repository-server/BMContent/2083",
    "type": "BMContent",
    "dateCreated": "2015-05-23T21:00:00",
    "dateModified": "2015-05-23T21:00:00",
    "hasDescriptiveMetadata": {
        "type": "DescriptiveMetadata",
        "date": "2015-05-23T21:00:00",
        "hasRelatedLink": "http://www.Eurovision.tv/page/contest-details?event=2083",
        "identifier": "2083",
        "title": "Eurovision Song Contest 2015 Grand Final",
        "esc:orderOk": "\n      1\n    ",
        "esc:resultsKnown": "\n      1\n    ",
        "esc:votingRules": "\n      Televoters and a professional jury in each country have a 50% stake in the outcome. The votes are revealed by spokespeople from all participating countries.\n    "
    },
    "hasPart": [
        "http://repository-server/BMContent/2083_00_00_00",
        "http://repository-server/BMContent/2083_01_06_16",
        "http://repository-server/BMContent/2083_01_07_05",
        "http://repository-server/BMContent/2083_00_10_07"
    ],
    "label": [
        "Song contest",
        "2015",
        "Eurovision"
    ]
}
```

Using the `jsonld.flatten()` method we can untangle the resources. This method will return an array with all nodes including the toplevel node.

```javascript
{
    "@context": "http://repository-server/contextEmbedded",
    "id": "_:b0",
    "type": "DescriptiveMetadata",
    "date": "2015-05-23T21:00:00",
    "hasRelatedLink": "http://www.Eurovision.tv/page/contest-details?event=2083",
    "identifier": "2083",
    "title": "Eurovision Song Contest 2015 Grand Final",
    "esc:orderOk": "\n      1\n    ",
    "esc:resultsKnown": "\n      1\n    ",
    "esc:votingRules": "\n      Televoters and a professional jury in each country have a 50% stake in the outcome. The votes are revealed by spokespeople from all participating countries.\n    "
}
```

and

```javascript
{
    "@context": "http://repository-server/contextEmbedded",
    "id": "http://repository-server/BMContent/2083",
    "type": "BMContent",
    "dateCreated": "2015-05-23T21:00:00",
    "dateModified": "2015-05-23T21:00:00",
    "hasDescriptiveMetadata": "_:b0",
    "hasPart": [
        "http://repository-server/BMContent/2083_00_00_00",
        "http://repository-server/BMContent/2083_01_06_16",
        "http://repository-server/BMContent/2083_01_07_05",
        "http://repository-server/BMContent/2083_00_10_07"
    ],
    "label": [
        "Song contest",
        "2015",
        "Eurovision"
    ]
}
```

As you can see the DescriptiveMetadata node got a generated ID assigned. This was needed since it's referenced from the BMObject document. 




