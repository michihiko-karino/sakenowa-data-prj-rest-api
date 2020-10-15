import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection().then(async connection => {

  // 外部キー制約を外す
  await connection.query('SET FOREIGN_KEY_CHECKS = 0;').then(reason => console.table(reason));

  // area
  console.log('DELETE area');
  await connection.query('DELETE FROM area;').then(reason => console.table(reason));
  console.log("LOAD DATA area");
  await connection.query(`
    LOAD DATA LOCAL INFILE "database/lib/seeds/area.csv" 
    INTO TABLE area
    FIELDS TERMINATED BY ',' ENCLOSED BY '"'
    LINES TERMINATED BY '\n' IGNORE 1 LINES
    (@id,@name)
    SET
      id = @id,
      name = @name;
  `).then(reason => console.table(reason));
  console.log("FINISH area");

  // brand
  console.log('DELETE brand');
  await connection.query('DELETE FROM brand;').then(reason => console.table(reason));
  console.log("LOAD DATA brand");
  await connection.query(`
    LOAD DATA LOCAL INFILE "database/lib/seeds/brand.csv" 
    INTO TABLE brand
    FIELDS TERMINATED BY ',' ENCLOSED BY '"'
    LINES TERMINATED BY '\n' IGNORE 1 LINES
    (@id,@name,@breweryId)
    SET
      id = @id,
      name = @name,
      breweryId = @breweryId;
  `).then(reason => console.table(reason));
  console.log("FINISH brand");

  // brewery
  console.log('DELETE brewery');
  await connection.query('DELETE FROM brewery;').then(reason => console.table(reason));
  console.log("LOAD DATA brewery");
  await connection.query(`
    LOAD DATA LOCAL INFILE "database/lib/seeds/brewery.csv" 
    INTO TABLE brewery
    FIELDS TERMINATED BY ',' ENCLOSED BY '"'
    LINES TERMINATED BY '\n' IGNORE 1 LINES
    (@id,@name,@areaId)
    SET
      id = @id,
      name = @name,
      areaId = @areaId;
  `).then(reason => console.table(reason));
  console.log("FINISH brewery");

  // brand_score
  console.log('DELETE brand_score');
  await connection.query('DELETE FROM brand_score;').then(reason => console.table(reason));
  console.log("LOAD DATA brand_score");
  await connection.query(`
    LOAD DATA LOCAL INFILE "database/lib/seeds/brand_score.csv" 
    INTO TABLE brand_score
    FIELDS TERMINATED BY ',' ENCLOSED BY '"'
    LINES TERMINATED BY '\n' IGNORE 1 LINES
    (@yearMonth,@areaId,@score,@brandId)
    SET
      yearMonth = @yearMonth,
      areaId = @areaId,
      score = @score,
      brandId = @brandId;
  `).then(reason => console.table(reason));
  console.log("FINISH brand_score");

  // flavor_chart
  console.log('DELETE flavor_chart');
  await connection.query('DELETE FROM flavor_chart;').then(reason => console.table(reason));
  console.log("LOAD DATA flavor_chart");
  await connection.query(`
    LOAD DATA LOCAL INFILE "database/lib/seeds/flavor_chart.csv" 
    INTO TABLE flavor_chart
    FIELDS TERMINATED BY ',' ENCLOSED BY '"'
    LINES TERMINATED BY '\n' IGNORE 1 LINES
    (@brandId,@fruity,@mellow,@rich,@soft,@dry,@light)
    SET
      brandId = @brandId,
      fruity = @fruity,
      mellow = @mellow,
      rich = @rich,
      soft = @soft,
      dry = @dry,
      light = @light;
  `).then(reason => console.table(reason));
  console.log("FINISH flavor_chart");

  // flavor_tag
  console.log('DELETE flavor_tag');
  await connection.query('DELETE FROM flavor_tag;').then(reason => console.table(reason));
  console.log("LOAD DATA flavor_tag");
  await connection.query(`
    LOAD DATA LOCAL INFILE "database/lib/seeds/flavor_tag.csv" 
    INTO TABLE flavor_tag
    FIELDS TERMINATED BY ',' ENCLOSED BY '"'
    LINES TERMINATED BY '\n' IGNORE 1 LINES
    (@id,@tag)
    SET
      id = @id,
      tag = @tag;
  `).then(reason => console.table(reason));
  console.log("FINISH flavor_tag");

  // brand_flavor_tag
  console.log('DELETE brand_flavor_tag');
  await connection.query('DELETE FROM brand_flavor_tag;').then(reason => console.table(reason));
  console.log("LOAD DATA brand_flavor_tag");
  await connection.query(`
    LOAD DATA LOCAL INFILE "database/lib/seeds/brand_flavor_tag.csv" 
    INTO TABLE brand_flavor_tag
    FIELDS TERMINATED BY ',' ENCLOSED BY '"'
    LINES TERMINATED BY '\n' IGNORE 1 LINES
    (@brandId,@flavorTagId)
    SET
      brandId = @brandId,
      flavorTagId = @flavorTagId;
  `).then(reason => console.table(reason));
  console.log("FINISH brand_flavor_tag");

  // 外部キー制約を戻す
  await connection.query('SET FOREIGN_KEY_CHECKS = 1;').then(reason => console.table(reason));

}).catch(error => console.log(error));
