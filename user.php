<?php

$SUCCESS = ['success'=>true];

class USER
{
    private $db;
 
    function __construct($DB_con)
    {
      $this->db = $DB_con;
    }
 
    public function register($name,$uname,$umail,$upass)
    {
       try
       {
           $new_password = password_hash($upass, PASSWORD_DEFAULT);
           $stmt = $this->db->prepare("INSERT INTO users(user_name,user_email,user_pass, name) 
                                                       VALUES(:uname, :umail, :upass, :name)");
           $stmt->bindparam(":uname", $uname);
           $stmt->bindparam(":name", $name); 
           $stmt->bindparam(":umail", $umail);
           $stmt->bindparam(":upass", $new_password);            
           $stmt->execute(); 
   
           //return $stmt; 
           http_response_code(201);//FIX ME NOT SENDING
           return ['success'=>'OK'];
       }
       catch(PDOException $e)
       {
          http_response_code(400);//FIX ME NOT SHOWING
          return ['error' =>$e->getMessage()];
       }    
    }
 
    public function login($uname,$upass)
    {
       try
       {
          $stmt = $this->db->prepare("SELECT * FROM users WHERE user_name=:uname OR user_email=:umail LIMIT 1");
          $stmt->execute(array(':uname'=>$uname, ':umail'=>$uname));
          $userRow=$stmt->fetch(PDO::FETCH_ASSOC);
          if($stmt->rowCount() > 0)
          {
             if(password_verify($upass, $userRow['user_pass']))
             {
                $_SESSION['user_session'] = $userRow['user_id'];
                $_SESSION['user_name'] = $userRow['user_name'];
                return ['isLoggedin'=>true, 'name' => $_SESSION['user_name']];
             }
          }
          http_response_code(400);
          return ['isLoggedin'=>false];
       }
       catch(PDOException $e)
       {
          http_response_code(400);
          return ['isLoggedin'=>false];

           //echo $e->getMessage();
       }
   }

   public function save_project_data($id, $data) {
      try
       {
          $result = [];
          $stmt = $this->db->prepare("UPDATE projects SET project_data = :pd WHERE id = :pid");
          $stmt->bindparam(":pid", $id, PDO::PARAM_INT);
          $stmt->bindparam(":pd", $data);
          $stmt->execute();
          //$res = $stmt->fetch(PDO::FETCH_ASSOC);
          http_response_code(200);  
          return ;
       }
       catch(PDOException $e)
       {
        //  http_response_code(400);
          echo $e->getMessage();
      //return [];

           
       }
   }

   public function get_all_users()
   {
      try
       {
          $stmt = $this->db->prepare("SELECT user_id, user_name, user_email, name FROM users");
          $stmt->execute();
          $userRow=$stmt->fetchall(PDO::FETCH_ASSOC);
          return $userRow;
       }
       catch(PDOException $e)
       {
           echo $e->getMessage();
       }
   }
   
   public function get_project($current_project_id)
   {
      try
       {
      $result = [];
          $stmt = $this->db->prepare("SELECT project_name, project_data FROM projects WHERE id = :id");
          $stmt->bindparam(":id", $current_project_id, PDO::PARAM_INT);
          $stmt->execute();
          $row = $stmt->fetch(PDO::FETCH_ASSOC);
          return $row;
       }
       catch(PDOException $e)
       {
          http_response_code(400);
          echo $e->getMessage();
          return [];

           
       }
     }
   public function get_all_schools()
   {
      try
       {
		  $result = [];
          $stmt = $this->db->prepare("SELECT name FROM schools");
		  $stmt->execute();
		  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			 $result[] = $row;
		  }
          return $result;
       }
	   catch(PDOException $e)
       {
          http_response_code(400);
          echo $e->getMessage();
		  return [];

           
       }
   }
   public function get_my_schools()
   {
      try
       {
		  $result = [];
          $stmt = $this->db->prepare("SELECT name FROM schools JOIN school_user_relation ON school_user_relation.school_id = schools.id where school_user_relation.user_id = :oid");
		  $stmt->bindparam(":oid", $_SESSION['user_session'], PDO::PARAM_INT);
		  $stmt->execute();
		  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			 $result[] = $row;
		  }
          return $result;
       }
	   catch(PDOException $e)
       {
          http_response_code(400);
          echo $e->getMessage();
		  return [];

           
       }
   }
   public function get_lessons($current_project_id)
   {
      try
       {
		  $result = [];
          $stmt = $this->db->prepare("
		  	select
            lessons.id,
			lessons.lesson_name,
			grades.grade_name,
			grades.grade_number,
			users.name
			from
			lessons
			join grades
			on grades.id = lessons.grade_id
			join project_lesson_relation
			on project_lesson_relation.lesson_id = lessons.id 
			join users
			on users.user_id = lessons.teacher_id
			where project_lesson_relation.project_id = :current_project_id");
          $stmt->bindparam(":current_project_id", $current_project_id, PDO::PARAM_INT);
		  $stmt->execute();
		  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			 $result[] = $row;
		  }
          return $result;
       }
       catch(PDOException $e)
       {
          http_response_code(400);
          echo $e->getMessage();
		  return [];

           
       }
   }
   public function is_loggedin()
   {
      if(isset($_SESSION['user_session']))
      {
         return  ['isLoggedin'=>true, 'name'=>$_SESSION['user_name']];
      } 
      else
      {
        return  ['isLoggedin'=>false];
      }
   }
 
   public function redirect($url)
   {
       header("Location: $url");
   }
   public function set_project_lesson_relation($pair_id, $project_id)
   {
	   try
	   {
           $stmt = $this->db->prepare("INSERT INTO project_lesson_relation (lesson_id, project_id) VALUES (:pair_id, :project_id)");
	       $stmt->bindparam(":pair_id", $pair_id, PDO::PARAM_INT);
	       $stmt->bindparam(":project_id", $project_id, PDO::PARAM_INT);
	   	   $stmt->execute();
		   http_response_code(200);
           return ['success'=>'OK'];
	   }
	   catch(PDOException $e)
	   {
		   http_response_code(400);//FIX ME NOT SENDING
           return ['error'=>$e->getMessage()];
       }
   }
   public function set_school_user_relation($school_id, $user_id)
   {
	   try
	   {
           $stmt = $this->db->prepare("INSERT INTO project_lesson_relation (school_id, user_id) VALUES (:school_id, :user_id)");
	       $stmt->bindparam(":school_id", $school_id, PDO::PARAM_INT);
	       $stmt->bindparam(":user_id", $user_id, PDO::PARAM_INT);
	   	   $stmt->execute();
		   http_response_code(200);
           return ['success'=>'OK'];
	   }
	   catch(PDOException $e)
	   {
		   http_response_code(400);//FIX ME NOT SENDING
           return ['error'=>$e->getMessage()];
       }
   }
   public function add_lesson($subject, $teach_id, $grade_id)
   {
       try
	   {
           $stmt = $this->db->prepare("INSERT INTO lessons (lesson_name, teacher_id, grade_id) VALUES (:subject, :teacher_id, :grade_id)");
	       $stmt->bindparam(":subject", $subject);
	       $stmt->bindparam(":teacher_id", $teach_id, PDO::PARAM_INT);
		   $stmt->bindparam(":grade_id", $grade_id, PDO::PARAM_INT);
	   	   $stmt->execute();
		   http_response_code(200);
           return ['success'=>'OK'];
	   }
	   catch(PDOException $e)
	   {
		   http_response_code(400);//FIX ME NOT SENDING
           return ['error'=>$e->getMessage()];
       }
   }
   public function delete_lesson($lesson_id)
   {
       try
	   {
           $stmt = $this->db->prepare("DELETE FROM lessons WHERE id = :lid");
		   $stmt->bindparam(":lid", $lesson_id, PDO::PARAM_INT);
	   	   $stmt->execute();
		   http_response_code(200);
           return ['success'=>'OK'];
	   }
	   catch(PDOException $e)
	   {
		   http_response_code(400);//FIX ME NOT SENDING
           return ['error'=>$e->getMessage()];
       }
   }
   public function delete_project($project_id)
   {
       try
	   {
           $stmt = $this->db->prepare("DELETE FROM projects WHERE id = :pid");
		   $stmt->bindparam(":pid", $project_id, PDO::PARAM_INT);
	   	   $stmt->execute();
           
           $stmt = $this->db->prepare("DELETE FROM project_lesson_relation WHERE project_id = :pid");
	   	   $stmt->bindparam(":pid", $project_id, PDO::PARAM_INT);
           $stmt->execute();
		   http_response_code(200);
           return ['success'=>'OK'];
	   }
	   catch(PDOException $e)
	   {
		   http_response_code(400);//FIX ME NOT SENDING
           return ['error'=>$e->getMessage()];
       }
   }
   public function add_project($p_name)
   {
       try
	   {
           if(isset($_SESSION['user_session']))
           {
               $stmt = $this->db->prepare("INSERT INTO projects (owner_id, project_name) VALUES (:oid, :pr_name)");
	           $stmt->bindparam(":oid", $_SESSION['user_session'], PDO::PARAM_INT);
               $stmt->bindparam(":pr_name", $p_name);
	   	       $stmt->execute();
		       http_response_code(200);
               return ['success'=>'OK'];
           }
       }
	   catch(PDOException $e)
	   {
		   http_response_code(400);//FIX ME NOT SENDING
           return ['error'=>$e->getMessage()];
       }
   }
   public function add_school($school_name)
   {
       try
	   {
           if(isset($_SESSION['user_session']))
           {
               $stmt = $this->db->prepare("INSERT INTO schools (name) VALUES (:school_name)");
               $stmt->bindparam(":school_name", $school_name);
	   	       $stmt->execute();
		       http_response_code(200);
               return ['success'=>'OK'];
           }
       }
	   catch(PDOException $e)
	   {
		   http_response_code(400);//FIX ME NOT SENDING
           return ['error'=>$e->getMessage()];
       }
   }
   public function get_all_projects()
   {
       try
       {
		  $result = [];
          $stmt = $this->db->prepare("SELECT id, project_name FROM projects WHERE owner_id = :cid");
		  $stmt->bindparam(":cid", $_SESSION['user_session'], PDO::PARAM_INT);
          $stmt->execute();
          while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			 $result[] = $row;
		  }
          return $result;
	   }
       catch(PDOException $e)
       {
           echo $e->getMessage();
       }
   }
   public function logout()
   {
        session_destroy();
        unset($_SESSION['user_session']);
        unset($_SESSION['user_name']);
        return $SUCCESS;
   }
}
?>
