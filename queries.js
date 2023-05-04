//////////Q1:Find all the mentors with who has the mentee's count more than 15

db.batch_detailcollection.aggregate( [ { $match: { batch_strength: { $gt:15 } } },
{ $lookup: { from: "mentor_details", localField: "mentor_id", foreignField: "id", as: "mentor_details" } },
{ $project: { mentor_details: { id:1, mentor_name:1 } , batch_strength:1 } } ] )

//////////Q2:Find the number of problems solved by the user in codekata

db.codekata_collection.aggregate( [ { $lookup: { from: "user_details", localField: "user_id", foreignField:"_id", as:"user_detail" } },
  { $project:{ user_detail:{ id:1,user_name:1 }, problems_solved:1 } } ] )
  
  //////////Q4:Find all the company drives which appeared between 15 oct-2022 and 31-oct-2022
  
  db.companydrive_collection.aggregate( [ { $match:{ "attend_on":{ "$gte":ISODate("2022-10-15"), $lte:ISODate("2022-10-31" ) } } }])
  
//////////Q5:Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

db.attendance_collection.aggregate([
  {
    $match: {
      $and: [
        { "date":{ "$gte":ISODate("2020-10-15"),$lte:ISODate("2020-10-31" ) } }, 
        {"status_submitted":{$ne:true }},
        {"status":{$ne:true}},
      ]
    }
  }
])

//////////Q6:Find all the company drives and students who are appeared for the placement.

db.placedstudent_collection.find( { is_attended:true } )
db.companydrive_collection.find( { is_driveattended:true } )

//////////Q3:Find all the topics and tasks which are thought in the month of October

db.topic_collection.aggregate([
  {
    $match:{"assigned_date":{"$gte":ISODate("2020-10-01"),$lte:ISODate("2020-10-31")}}
  },
  {$lookup:{from:"task_collection",localField:"task_id",foreignField:"_id",as:"task_details"}},
  {$project:{topic_name:1,task_details:{task:1},assigned_date:1}}
  ])
  
