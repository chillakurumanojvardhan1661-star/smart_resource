const { Client } = require("@elastic/elasticsearch");

const esClient = new Client({
  node: process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
});

async function initElasticsearch() {
  try {
    const indexName = "products";
    const indexExists = await esClient.indices.exists({ index: indexName });

    if (!indexExists) {
      await esClient.indices.create({
        index: indexName,
        body: {
          mappings: {
            properties: {
              name: { type: "text" },
              category: { type: "keyword" },
              supplierName: { type: "text" },
              country: { type: "keyword" },
              price: { type: "float" },
              moq: { type: "integer" },
            },
          },
        },
      });
      console.log(`Created Elasticsearch index: ${indexName}`);
    } else {
      console.log(`Elasticsearch index ${indexName} already exists`);
    }
  } catch (error) {
    console.error("Failed to initialize Elasticsearch index:", error);
  }
}

module.exports = { esClient, initElasticsearch };
