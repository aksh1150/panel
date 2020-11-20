ALTER TABLE `caribou`.`contact` 
CHANGE COLUMN `case_id` `case_id` VARCHAR(25) NOT NULL ,
ADD UNIQUE INDEX `case_id_UNIQUE` (`case_id` ASC);
;

ALTER TABLE `caribou`.`contact` 
CHANGE COLUMN `case_id` `case_id` VARCHAR(25) NULL ;



ALTER TABLE `caribou`.`contact` 
CHANGE COLUMN `case_id` `case_id` VARCHAR(25) NOT NULL ,
DROP INDEX `case_id_UNIQUE` ;
;


ALTER TABLE `caribou`.`case` 
ADD COLUMN `related_contacts` JSON NULL AFTER `if_lead`;



ALTER TABLE `caribou`.`contact` 
CHANGE COLUMN `case_id` `case_id` JSON NOT NULL ;


ALTER TABLE `caribou`.`contact` 
CHANGE COLUMN `case_id` `case_id` JSON NULL ;



ALTER TABLE `caribou`.`case` 
ADD COLUMN `advisor_id` INT NULL AFTER `related_contacts`;

/*
    Updated 2020-11-11
*/
ALTER TABLE `caribou`.`contact` 
CHANGE COLUMN `contact_uid` `_uid` VARCHAR(45) NOT NULL ;

ALTER TABLE `caribou`.`case` 
CHANGE COLUMN `case_id` `_uid` VARCHAR(25) NOT NULL COMMENT 'Unique case id' ;