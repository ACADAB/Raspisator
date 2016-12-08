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
 
   public function logout()
   {
        session_destroy();
        unset($_SESSION['user_session']);
        unset($_SESSION['user_name']);
        return $SUCCESS;
   }
}
?>
