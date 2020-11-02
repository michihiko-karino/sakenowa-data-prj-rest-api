import { createObjectCsvWriter } from 'csv-writer';
import fetch from 'node-fetch';

type SakaenowaResponse = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: Object[];
};

const SAKENOWA_ENDPOINT = 'https://muro.sakenowa.com/sakenowa-data/api';

const requestSakenowa = async (endpoint: string) => {
  const response = await fetch(`${SAKENOWA_ENDPOINT}/${endpoint}`);
  const data = await response.json();

  return data as SakaenowaResponse;
};

const writeAreaCSV = async () => {
  const data = await requestSakenowa('areas');
  const csvWriter = createObjectCsvWriter({
    path: './database/lib/seeds/area.csv',
    header: [
      {id: 'id', title: 'ID'},
      {id: 'name', title: 'NAME'}
    ]
  });

  await csvWriter.writeRecords(data.areas);
  console.log('Area Done!')
};

const writeBrandCSV = async () => {
  const data = await requestSakenowa('brands');
  const csvWriter = createObjectCsvWriter({
    path: './database/lib/seeds/brand.csv',
    header: [
      {id: 'id', title: 'ID'},
      {id: 'name', title: 'NAME'},
      {id: 'breweryId', title: 'BREWERY_ID'},
    ]
  });

  await csvWriter.writeRecords(data.brands);
  console.log('Brand Done!')
};

const writeBreweryCSV = async () => {
  const data = await requestSakenowa('breweries') as unknown as { breweries: { id: number, name: string, areaId: number }[] };
  const csvWriter = createObjectCsvWriter({
    path: './database/lib/seeds/brewery.csv',
    header: [
      {id: 'id', title: 'ID'},
      {id: 'name', title: 'NAME'},
      {id: 'areaId', title: 'AREA_ID'},
    ],
  });

  await csvWriter.writeRecords(data.breweries);
  console.log('Brewery Done!')
};

const writeBrandScoreCSV = async () => {
  const data = await requestSakenowa('rankings');
  const csvWriter = createObjectCsvWriter({
    path: './database/lib/seeds/brand_score.csv',
    header: [
      {id: 'yearMonth', title: 'YEAR_MONTH'},
      {id: 'areaId', title: 'AREA_ID'},
      {id: 'score', title: 'SCORE'},
      {id: 'allRank', title: 'ALL_RANK'},
      {id: 'areaRank', title: 'AREA_RANK'},
      {id: 'brandId', title: 'BRAND_ID'},
    ],
  });

  const writeData = [];
  const yearMonth = data.yearMonth as unknown as string;
  const areas = data.areas as { areaId: number, ranking: { rank: number, score: number, brandId: number }[] }[];
  areas.forEach((area) => {
    const areaId = area.areaId
    area.ranking.forEach((r) => {
      writeData.push({
        yearMonth,
        areaId,
        score: r.score,
        allRank: null,
        areaRank: r.rank,
        brandId: r.brandId,
      });
    });
  });

  const overall = data.overall as { rank: number, score: number, brandId: number }[];
  overall.forEach((i) => {
    const found = writeData.find(datum => datum.brandId === i.brandId);
    found.allRank = i.rank;
  });

  await csvWriter.writeRecords(writeData);
  console.log('BrandScore Done!')
};

const writeFlavorChartCSV = async () => {
  const data = await requestSakenowa('flavor-charts');
  const csvWriter = createObjectCsvWriter({
    path: './database/lib/seeds/flavor_chart.csv',
    header: [
      {id: 'brandId', title: 'BRAND_ID'},
      {id: 'f1', title: 'FRUITY'},
      {id: 'f2', title: 'MELLOW'},
      {id: 'f3', title: 'RICH'},
      {id: 'f4', title: 'SOFT'},
      {id: 'f5', title: 'DRY'},
      {id: 'f6', title: 'LIGHT'},
    ]
  });

  await csvWriter.writeRecords(data.flavorCharts);
  console.log('FlavorChart Done!')
};

const writeFlavorTagCSV = async () => {
  const data = await requestSakenowa('flavor-tags');
  const csvWriter = createObjectCsvWriter({
    path: './database/lib/seeds/flavor_tag.csv',
    header: [
      {id: 'id', title: 'ID'},
      {id: 'tag', title: 'TAG'},
    ]
  });

  await csvWriter.writeRecords(data.tags);
  console.log('FlavorTag Done!')
};

const writeBrandFlavorTagCSV = async () => {
  const data = await requestSakenowa('brand-flavor-tags');
  const csvWriter = createObjectCsvWriter({
    path: './database/lib/seeds/brand_flavor_tag.csv',
    header: [
      {id: 'brandId', title: 'BRAND_ID'},
      {id: 'flavorTagId', title: 'FLAVOR_TAG_ID'},
    ]
  });

  const writeData = [];
  const brandFlavorTags = data.flavorTags as { brandId: number, tagIds: number[] }[];
  brandFlavorTags.forEach((brandFlavorTag) => {
    const brandId = brandFlavorTag.brandId;
    brandFlavorTag.tagIds.forEach((tagId) => writeData.push({ brandId, flavorTagId: tagId }));
  });

  await csvWriter.writeRecords(writeData);
  console.log('BrandFlavorTag Done!')
};

(async () => {
  await writeAreaCSV();
  await writeBrandCSV();
  await writeBreweryCSV();
  await writeBrandScoreCSV();
  await writeFlavorChartCSV();
  await writeFlavorTagCSV();
  await writeBrandFlavorTagCSV();
})();