# Bag of Words

Bag of Words is an API that generates random words and also templates to be used on different platforms.
The word definitions are collected from the [Dictionary API](https://dictionaryapi.dev/)

Try it [here](https://4mz6hhf5ed.execute-api.us-east-1.amazonaws.com/dev/word).

## Requirements
* AWS Account
* Azure Account
* [Serverless](https://www.serverless.com/) framework
* NodeJS
* NPM or Yarn

## Config

### Azure Translator
It was used this translator because of the pricing limits
* Create a Translator in the [Azure Portal](https://portal.azure.com/)
* Specify the Resource Group, region, name, and pricing tier (select the F0)
* After the resource is created, access the "Keys and Endpoint"
* Copy the value of "KEY1" and add in the `MICROSOFT_TRANSLATOR_SUBSCRIPTION_KEY` in the `serverless.yml` file
* Fill the `MICROSOFT_TRANSLATOR_LOCATION` with the Location/Region
* Get the link of `Text Translation` and add in the `MICROSOFT_API_COGNITIVE_ENDPOINT`

![Image](docs/Azure/translator_endpoint.jpg)

## Install
Rename the file `serverless-copy.yml`to `serverless.yml`
```
# Install dependencies
npm i

# Install dev dependencies
npm i -D

```
## Test
[http://localhost:3000/dev/word/](http://localhost:3000/dev/word/)

```
//For testing is informing a single random word, but by default, the api will provide 3 words
{
    "words": [
        {
            "word": "Summer",
            "phonetic": "ˈsʌmə",
            "phonetics": [
                {
                    "text": "ˈsʌmə",
                    "audio": "//ssl.gstatic.com/dictionary/static/sounds/20200429/summer--_gb_1.mp3"
                }
            ],
            "origin": "Old English sumor, of Germanic origin; related to Dutch zomer, German Sommer, also to Sanskrit samā ‘year’.",
            "meanings": [
                {
                    "partOfSpeech": "noun",
                    "definitions": [
                        {
                            "definition": "the warmest season of the year, in the northern hemisphere from June to August and in the southern hemisphere from December to February.",
                            "example": "this plant flowers in late summer",
                            "synonyms": [],
                            "antonyms": []
                        }
                    ]
                },
                {
                    "partOfSpeech": "verb",
                    "definitions": [
                        {
                            "definition": "spend the summer in a particular place.",
                            "example": "well over 100 birds summered there in 1976",
                            "synonyms": [],
                            "antonyms": []
                        }
                    ]
                }
            ]
        }
    ]
}
```
### Specific language
[http://localhost:3000/dev/word/de](http://localhost:3000/dev/word/de)
```
//For this example it'll collect Deutsch random words
{
    "words": [
        {
            "word": "Schaden",
            "phonetic": "scháden",
            "phonetics": [
                {
                    "text": "scháden"
                }
            ],
            "origin": "mittelhochdeutsch schaden, althochdeutsch scadōn, zu Schaden",
            "meanings": [
                {
                    "partOfSpeech": "schwaches Verb",
                    "definitions": [
                        {
                            "definition": "für jemanden, etwas von Nachteil sein; einen Verlust, eine Beeinträchtigung darstellen, bewirken",
                            "example": "jemandem geschäftlich schaden",
                            "synonyms": [],
                            "antonyms": []
                        }
                    ]
                }
            ],
            "translation": {
                "text": "Hurt",
                "language": "en"
            }
        }
    ]
}

```
### Templates
* [Slack](http://localhost:3000/dev/word/template/slack)
```
{
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Word*: Track\n*Example*: Secondary radars that track the aircraft in flight\n*Phonetics*: <https://ssl.gstatic.com/dictionary/static/sounds/20200429/track--_gb_1.mp3|Track>"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Word*: Birth\n*Example*: She birthed five children within ten years\n*Phonetics*: <https://ssl.gstatic.com/dictionary/static/sounds/20200429/birth--_gb_1.mp3|Birth>"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Word*: My\n*Example*: My goodness!\n*Phonetics*: <https://ssl.gstatic.com/dictionary/static/sounds/20200429/my--_gb_1.mp3|My>"
            }
        },
        {
            "type": "divider"
        }
    ]
}
```

## Deploy 
As this project was built with the serverless framework and the provider was set as `AWS`, the project will be deployed in the AWS.
```
npm run deploy
```

## Azure DevOps
In the folder `Azure` it was created the file that is responsible to run the ![`Azure Pipelines`](azure/azure-pipelines.yml).
First it's needed a KeyVault to store all the secrets needed, so create a new one and add the following secrets:
* aws-key - AWS key of the user
* aws-secret - AWS secret of the user
* MICROSOFT-TRANSLATOR-LOCATION - location where Microsoft translator is
* MICROSOFT-TRANSLATOR-SUBSCRIPTION-KEY - Key from the Microsoft translator

In the `Library` from Azure DevOps, create a new variable group called `BagOfWords var group` (or chose a name that you want), click in the `Link secrets from an Azure key vault variables`. In `Variables`, click on `Add` and select all the secrets from the key vault. Click on save.

This is the sample of the azure-pipeline.yml. It was created an template file to use as component called [deploy.yml](azure/deploy.yml).
```
trigger:
  batch: true
  branches:
    include:
    - main
  paths:
    exclude: 
    - README.md
    - LICENSE

pool:
  vmImage: ubuntu-latest

variables:
  - group: "BagOfWords var group" #Library group that was created

stages:      
  - stage: dev
    jobs:
    - template: /azure/deploy.yml #Using a deployment template to build and deploy the project
      parameters:
        stageDeployment: dev
        awsSecret: $(aws-secret)
        awsKey: $(aws-key)  
        microsoftLocation: $(MICROSOFT-TRANSLATOR-LOCATION)
        microsoftSubscription: $(MICROSOFT-TRANSLATOR-SUBSCRIPTION-KEY)
```