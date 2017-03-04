<?php
//1-препод
//2-редактор
$SUCCESS = ['success'=>true];

function stmt_to_dict($stmt, $index = "id"){
	$res = [];
	while($row = $stmt->fetch(PDO::FETCH_ASSOC))
	{
		$res[$row[$index]] = $row;
	}
	return $res;
}


class USER
{
	private $db;

	function __construct($DB_con)
	{
		$this->db = $DB_con;
	}

	public function approve_user($id, $token)
	{
		try
		{
			$stmt = $this->db->prepare("SELECT user_approve.user_id, user_approve.token, users.user_email FROM user_approve JOIN users ON user_approve.user_id = users.user_id WHERE user_approve.user_id=:id AND user_approve.token=:token");
			$stmt->bindparam(":id", $id);
			$stmt->bindparam(":token", $token); 
			$stmt->execute(); 
			$result = $stmt->fetchall(PDO::FETCH_ASSOC);
			if(count($result) > 0){
				$stmt = $this->db->prepare("DELETE FROM user_approve WHERE user_id=:id AND token=:token");
				$stmt->bindparam(":id", $id);
				$stmt->bindparam(":token", $token); 
				$stmt->execute(); 				

				$stmt = $this->db->prepare("UPDATE users SET approved=1 WHERE user_id=:id");
				$stmt->bindparam(":id", $id);
				$stmt->execute(); 				

				$this->mail($result[0]['user_email'], "noreply", "Регистриция в Raspisator.com","Аккаунт успешно зарегистрирован");

				$this->redirect("https://".LOCATION."/#/register/approved");
				return ;
			} else {
				$this->redirect("https://".LOCATION."/#/register/failed");
			}
		}
		catch(PDOException $e)
		{
			http_response_code(400);//FIX ME NOT SHOWING
			return ['error' =>$e->getMessage()];
		}    
	}

	public function hasRole($id, $s_id){
		$roles = $this->get_my_roles($s_id);
		foreach ($roles as $role) {
			if ($role['school_id'] == $s_id && $role['role_id'] == $id)
				return true;
		} 
		return false;
	}

	public function register($name,$uname,$umail,$upass)
	{
		try
		{
			$new_password = password_hash($upass, PASSWORD_DEFAULT);
			$stmt = $this->db->prepare("INSERT INTO users(user_name,user_email,user_pass, name) VALUES (:uname, :umail, :upass, :name)");
			$stmt->bindparam(":uname", $uname);
			$stmt->bindparam(":name", $name); 
			$stmt->bindparam(":umail", $umail);
			$stmt->bindparam(":upass", $new_password);            
			$stmt->execute(); 
			/*$stmt = $this->db->prepare("INSERT INTO role_user_school_relation(user_id,role_id,school_id, is_approved) VALUES(".strval($this->db->lastInsertId()).",1,1,1)");
			$stmt->execute(); 
			//return $stmt; 
			*/
			$id = $this->db->lastInsertId();

			$token = $this->generate_token();
			$stmt = $this->db->prepare("INSERT INTO user_approve(user_id, token) VALUES (".strval($id).',"'.$token.'")');
			$stmt->execute(); 

			$this->mail($umail, "noreply", "Регистриция в Raspisator.com","<p>Для подтверждения вашего аккаунта перейдиите по ссылке:</p><a href='https://".LOCATION."/API/approveUser.php?id=".strval($id)."&token=".$token."'>Подтвердить аккаунт</a>");

			http_response_code(201);//FIX ME NOT SENDING
			return ['success'=>'OK'];
		}
		catch(PDOException $e)
		{
			http_response_code(400);//FIX ME NOT SHOWING
			return ['error' =>$e->getMessage()];
		}    
	}
	public function change_pass($oldpass, $newpass)
	{
		try
		{
			$stmt = $this->db->prepare("SELECT * FROM users WHERE user_id = :uid");
			$stmt->bindparam(":uid", $_SESSION['user_session'], PDO::PARAM_INT);
			$stmt->execute();
			$result = $stmt->fetchall(PDO::FETCH_ASSOC);
			if(password_verify($oldpass, $result[0]['user_pass']))
			{
				$new_password = password_hash($newpass, PASSWORD_DEFAULT);
				$stmt = $this->db->prepare("UPDATE users SET user_pass = :newpass WHERE user_id = :uid");
				$stmt->bindparam(":uid", $_SESSION['user_session'], PDO::PARAM_INT);
				$stmt->bindparam(":newpass", $new_password, PDO::PARAM_INT);
				$stmt->execute();
				return 1;
			}
			http_response_code(400);
			return 0;
		}
		catch(PDOException $e)
		{
			http_response_code(400);
			return ['isLoggedin'=>false];

			//echo $e->getMessage();
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
				if($userRow['approved'] == 1 && password_verify($upass, $userRow['user_pass']))
				{
					$_SESSION['user_session'] = $userRow['user_id'];
					$_SESSION['user_name'] = $userRow['user_name'];
					$_SESSION['roles'] = $this -> get_my_roles();
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

	public function get_school_teachers($school_id)
	{
		if (!$this->hasRole(2, $school_id)){
			http_response_code(400);//FIX ME NOT SENDING
			return ['error'=>"Access denied"];
		}
		try
		{
			$stmt = $this->db->prepare("SELECT DISTINCT users.user_id, name FROM users JOIN role_user_school_relation ON role_user_school_relation.user_id = users.user_id WHERE role_user_school_relation.school_id = :id AND role_user_school_relation.role_id = 1");
			$stmt->bindparam(":id", $school_id, PDO::PARAM_INT);
			$stmt->execute();
			$teachers= stmt_to_dict($stmt, 'user_id');
			return $teachers;
		}
		catch(PDOException $e)
		{
			echo $e->getMessage();
		}
	}

	public function generate_token(){
		return bin2hex(openssl_random_pseudo_bytes(16));
	}

	public function add_subject($s_id, $name)
	{
		if (!$this->hasRole(2, $s_id)){
			http_response_code(400);//FIX ME NOT SENDING
			return ['error'=>"Access denied"];
		}
		try
		{
			$stmt = $this->db->prepare("INSERT INTO subjects (name,school_id) VALUES (:name, :sid)");
			$stmt->bindparam(":name", $name);
			$stmt->bindparam(":sid", $s_id, PDO::PARAM_INT);
			$stmt->execute();
			http_response_code(200);
			return ['success'=>'OK', 'id'=> $this->db->lastInsertId()];
		}
		catch(PDOException $e)
		{
			http_response_code(400);//FIX ME NOT SENDING
			return ['error'=>$e->getMessage()];
		}
	}
	
	public function copy_project($p_id)
	{
		try
		{
			if(isset($_SESSION['user_session']))
			{
				//var_dump($p_id);
				$stmt = $this->db->prepare("INSERT INTO projects 
				(owner_id, project_name, project_data, school_id, start, finish, lessons_per_day)
				SELECT owner_id, project_name, project_data, school_id, start, finish, lessons_per_day
				FROM projects WHERE id = :pid");
				$stmt->bindparam(":pid", $p_id, PDO::PARAM_INT);
				$stmt->execute();
				//var_dump(1000);
				http_response_code(200);
				return ['success'=>'OK', 'project_id' => $this->db->lastInsertId()];
			}
			else 
			{
				return 0;
			}
		}
		catch(PDOException $e)
		{
			http_response_code(400);//FIX ME NOT SENDING
			return ['error'=>$e->getMessage()];
		}
	}
	
	public function add_grade($s_id, $name, $number)
	{
		if (!$this->hasRole(2, $s_id)){
			http_response_code(400);//FIX ME NOT SENDING
			return ['error'=>"Access denied"];
		}
		try
		{
			$stmt = $this->db->prepare("INSERT INTO grades (grade_name,grade_number,school_id) VALUES (:name, :num, :sid)");
			$stmt->bindparam(":name", $name);
			$stmt->bindparam(":num", $number);
			$stmt->bindparam(":sid", $s_id, PDO::PARAM_INT);
			$stmt->execute();
			http_response_code(200);
			return ['success'=>'OK', 'id'=> $this->db->lastInsertId()];
		}
		catch(PDOException $e)
		{
			http_response_code(400);//FIX ME NOT SENDING
			return ['error'=>$e->getMessage()];
		}
	}

	public function mail($adress, $from, $subject, $text)
	{
		$header = 'From: '.$from."@".LOCATION."\r\nContent-Type: text/html; charset=UTF-8\r\n";
		mail($adress, $subject, $text, $header); 
	}
	public function get_school_data($sid)
	{
		if (!$this->hasRole(2, $sid)){
			http_response_code(400);//FIX ME NOT SENDING
			return ['error'=>"Access denied"];
		}
		try
		{

			$stmt = $this->db->prepare("SELECT id, name FROM subjects WHERE school_id = :id");
			$stmt->bindparam(":id", $sid, PDO::PARAM_INT);
			$stmt->execute();
			$subjects = stmt_to_dict($stmt);

			$stmt = $this->db->prepare("SELECT id, grade_name, grade_number FROM grades WHERE school_id = :id");
			$stmt->bindparam(":id", $sid, PDO::PARAM_INT);
			$stmt->execute();
			$grades= stmt_to_dict($stmt);

			$stmt = $this->db->prepare("SELECT name, lessons_per_day FROM schools WHERE id = :id");
			$stmt->bindparam(":id", $sid, PDO::PARAM_INT);
			$stmt->execute();
			$sinfo=$stmt->fetchall(PDO::FETCH_ASSOC);

			$teachers = $this->get_school_teachers($sid);//fix

			$all = ['school' => $sinfo, 'subjects' => $subjects, 'grades' => $grades, 'teachers' => $teachers];
			return $all;
		}
		catch(PDOException $e)
		{
			echo $e->getMessage();
		}
	}
	public function get_profile_data()
	{
		try
		{
			$stmt = $this->db->prepare("SELECT user_name, user_email, name FROM users WHERE user_id = :id");
			$stmt->bindparam(":id", $_SESSION['user_session'], PDO::PARAM_INT);
			$stmt->execute();
			$one=$stmt->fetchall(PDO::FETCH_ASSOC);

			$stmt = $this->db->prepare("SELECT school_id, role_id, is_approved FROM role_user_school_relation WHERE user_id = :id");
			$stmt->bindparam(":id", $sid, PDO::PARAM_INT);
			$stmt->execute();
			$two=$stmt->fetchall(PDO::FETCH_ASSOC);

			$all = ['one' => $one, 'two' => $two];
			return $all;
		}
		catch(PDOException $e)
		{
			echo $e->getMessage();
		}
	}
	public function get_project($current_project_id, $return_school_info)
	{
		try
		{
			$result = [];
			$stmt = $this->db->prepare("SELECT id, project_name, project_data, school_id, owner_id, start, finish, creation_time, lessons_per_day FROM projects WHERE id = :id");
			$stmt->bindparam(":id", $current_project_id, PDO::PARAM_INT);
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			if($return_school_info){
				$schedules = $this->get_school_schedules($row['school_id'],$row['start'],$row['finish'] );
				return ['project'=>$row, 'schedules'=>$schedules ,'school'=>$this->get_school_data($row['school_id'])];

			}else
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
			$stmt = $this->db->prepare("SELECT id, name, lessons_per_day FROM schools");
			$stmt->execute();
			$result = stmt_to_dict($stmt);
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
			$stmt = $this->db->prepare("SELECT DISTINCT schools.name, schools.id, schools.lessons_per_day, role_user_school_relation.role_id FROM schools JOIN role_user_school_relation 
					ON role_user_school_relation.school_id = schools.id and role_user_school_relation.user_id = :oid");
			$stmt->bindparam(":oid", $_SESSION['user_session'], PDO::PARAM_INT);
			$stmt->execute();
			$result = $stmt->fetchall(PDO::FETCH_ASSOC);
			return $result;
		}
		catch(PDOException $e)
		{
			http_response_code(400);
			echo $e->getMessage();
			return [];


		}
	}
	public function get_my_roles($s_id = -1)
	{
		try
		{
			$result = [];
			$query = "SELECT role_id, school_id FROM role_user_school_relation WHERE user_id = :oid";
			if ($s_id>=0)
				$query = $query." AND school_id = :sid";
			
			$stmt = $this->db->prepare($query);
			$stmt->bindparam(":oid", $_SESSION['user_session'], PDO::PARAM_INT);
			if ($s_id >= 0){
				$stmt->bindparam(":sid", $s_id, PDO::PARAM_INT);
			}
			$stmt->execute();
			$result = $stmt->fetchall(PDO::FETCH_ASSOC);
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
					SELECT
					lessons.id,
					lessons.teacher_id,
					lessons.subject_id,
					lessons.grade_id
					from
					lessons
					join projects
					on projects.school_id = lessons.school_id 
					where projects.id = :current_project_id");
			$stmt->bindparam(":current_project_id", $current_project_id, PDO::PARAM_INT);
			$stmt->execute();
			$result = $stmt->fetchall(PDO::FETCH_ASSOC);
			return $result;
		}
		catch(PDOException $e)
		{
			http_response_code(400);
			echo $e->getMessage();
			return [];
		}
	}
	public function save($p_id)
	{
		//echo __DIR__;
		//$command = 'python /var/www/html/Raspisator/saveToXcell.py '. escapeshellcmd($p_id);
		//echo $command;
		$command = 'python /var/www/html/Raspisator/saveToXcell.py '. escapeshellcmd($p_id).' > /var/www/html/Raspisator/log.txt';
		shell_exec($command);
	}
	public function get_school_lessons($school_id)
	{
		try
		{
			$result = [];
			$stmt = $this->db->prepare("
					SELECT
					lessons.id,
					lessons.teacher_id,
					lessons.subject_id,
					lessons.grade_id
					from
					lessons 
					where lessons.school_id = :school_id");
			$stmt->bindparam(":school_id", $school_id, PDO::PARAM_INT);
			$stmt->execute();
			$result = $stmt->fetchall(PDO::FETCH_ASSOC);
			return $result;
		}
		catch(PDOException $e)
		{
			http_response_code(400);
			echo $e->getMessage();
			return [];


		}
	}
	public function get_user_schedule($user_id, $start, $finish)
	{
		try
		{
			$result = [];
			$stmt = $this->db->prepare("SELECT free_pairs, date FROM schedule where user_id = :uid and date >= '".$start."' and date <= '".$finish."'");
			$stmt->bindparam(":uid", $user_id, PDO::PARAM_INT);
			$stmt->execute();
			$result = $stmt->fetchall(PDO::FETCH_ASSOC);
			return $result;
		}
		catch(PDOException $e)
		{
			http_response_code(400);
			echo $e->getMessage();
			return [];


		}
	}

	public function get_school_schedules($school_id, $start, $finish)
	{
		try
		{
			$result = [];
			$stmt = $this->db->prepare("SELECT free_pairs, date, user_id FROM schedule JOIN  lessons ON lessons.teacher_id = schedule.user_id where lessons.school_id = :sid and date >= '".$start."' and date <= '".$finish."'");
			$stmt->bindparam(":sid", $school_id, PDO::PARAM_INT);
			$stmt->execute();
			$result = $stmt->fetchall(PDO::FETCH_ASSOC);
			return $result;
		}
		catch(PDOException $e)
		{
			http_response_code(400);
			echo $e->getMessage();
			return [];


		}
	}

	public function set_schedule($schedule, $user_id)
	{
		try
		{
			//$schedule['days'];
			$schedule = json_decode($schedule);
			//var_dump($schedule);
			//var_dump( $schedule->school_id);
			$s = "REPLACE INTO schedule (user_id, date, school_id, free_pairs) VALUES ";
			for($i = 0; $i < count($schedule->days); $i=$i+1)
			{//todo: fix this to be secure
				$s=$s."(".$user_id.",\"".$schedule->days[$i]->date."\",".$schedule->school_id.",\"".json_encode($schedule->days[$i]->ready)."\")";
				if($i != count($schedule->days)-1)
					$s=$s.',';
			}
			$stmt = $this->db->prepare($s);
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
		http_response_code(303);
	}
	public function set_role_user_school_relation($school_id, $user_id, $role_id)
	{
		$is_approved = !$this->hasRole(2, $school_id);
		try
		{
			$stmt = $this->db->prepare("INSERT INTO role_user_school_relation (user_id, role_id, school_id, is_approved) VALUES (:user_id, :role_id, :school_id, :is_approved)");
			$stmt->bindparam(":user_id", $user_id, PDO::PARAM_INT);
			$stmt->bindparam(":role_id", $role_id, PDO::PARAM_INT);
			$stmt->bindparam(":school_id", $school_id, PDO::PARAM_INT);
			$stmt->bindparam(":is_approved", $is_approved, PDO::PARAM_INT);
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
	public function add_lesson($school_id,$subject_id, $teacher_id, $grade_id)
	{
		try
		{
			$stmt = $this->db->prepare("INSERT INTO lessons (school_id, subject_id, teacher_id, grade_id) VALUES (:school_id,:subject_id, :teacher_id, :grade_id)");
			$stmt->bindparam(":subject_id", $subject_id);
			$stmt->bindparam(":school_id", $school_id, PDO::PARAM_INT);
			$stmt->bindparam(":teacher_id", $teacher_id, PDO::PARAM_INT);
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

			http_response_code(200);
			return ['success'=>'OK'];
		}
		catch(PDOException $e)
		{
			http_response_code(400);//FIX ME NOT SENDING
			return ['error'=>$e->getMessage()];
		}
	}
	public function add_project($p_name, $s_id, $start, $finish, $lessons_per_day)
	{
		try
		{
			if(isset($_SESSION['user_session'])) //and in_array({1,2}, $_SESSION['roles'])
			{
				//$stmt = $this->db->prepare("INSERT INTO projects (owner_id, project_name, school_id, start, finish, lessons_per_day) VALUES (:oid, :pr_name, :s_id, :start, :finish, :lpd)");
				$stmt = $this->db->prepare("INSERT INTO projects (owner_id, project_name, school_id, start, finish, lessons_per_day)
				SELECT :oid, :pr_name, :s_id, :start, :finish, lessons_per_day FROM schools where id = :s_id");
				$stmt->bindparam(":oid", $_SESSION['user_session'], PDO::PARAM_INT);
				$stmt->bindparam(":s_id", $s_id, PDO::PARAM_INT);
				$stmt->bindparam(":lpd", $lessons_per_day, PDO::PARAM_INT);
				$stmt->bindparam(":pr_name", $p_name);
				$stmt->bindparam(":start", $start);
				$stmt->bindparam(":finish", $finish);
				$stmt->execute();
				http_response_code(200);
				return ['success'=>'OK', 'project_id' => $this->db->lastInsertId()];
			}
			else 
			{
				return 0;
			}
		}
		catch(PDOException $e)
		{
			//http_response_code(400);//FIX ME NOT SENDING
			return ['error'=>$e->getMessage()];
		}
	}

	public function edit_project($p_id, $p_name, $start, $finish, $lessons_per_day)
	{
		try
		{
			if(isset($_SESSION['user_session'])) //and in_array({1,2}, $_SESSION['roles'])
			{
				$stmt = $this->db->prepare("UPDATE projects JOIN schools on projects.school_id = schools.id SET project_name=:pr_name, start=:start, finish=:finish, projects.lessons_per_day=schools.lessons_per_day WHERE projects.id=:pid AND projects.owner_id=:oid");
				//$stmt = $this->db->prepare("UPDATE projects SET project_name=:pr_name, start=:start, finish=:finish, lessons_per_day=:lpd WHERE id=:pid AND owner_id=:oid");
				//$stmt = $this->db->prepare("UPDATE projects (owner_id, project_name, school_id, start, finish, lessons_per_day)
				//SELECT :oid, :pr_name, :s_id, :start, :finish, lessons_per_day FROM schools where id = :s_id");
				$stmt->bindparam(":oid", $_SESSION['user_session'], PDO::PARAM_INT);
				$stmt->bindparam(":pid", $p_id, PDO::PARAM_INT);
				$stmt->bindparam(":pr_name", $p_name);
				$stmt->bindparam(":start", $start);
				$stmt->bindparam(":finish", $finish);
				$stmt->execute();
				http_response_code(200);
				return ['success'=>'OK'];
			}
			else 
			{
				return 0;
			}
		}
		catch(PDOException $e)
		{
			//http_response_code(400);//FIX ME NOT SENDING
			return ['error'=>$e->getMessage()];
		}
	}

	public function add_school($school_name, $lessons_per_day)
	{
		try
		{
			if(isset($_SESSION['user_session']))
			{
				$stmt = $this->db->prepare("INSERT INTO schools (name, lessons_per_day) VALUES (:school_name, :lpd)");
				$stmt->bindparam(":school_name", $school_name);
				$stmt->bindparam(":lpd", $lessons_per_day, PDO::PARAM_INT);
				$stmt->execute();
//TODO:ADDDMEEEEE
				$this->set_role_user_school_relation($this->db->lastInsertId(), $_SESSION['user_session'], 2, 1);

				http_response_code(200);
				return ['success'=>'OK', 'id'=>$this->db->lastInsertId()];
			}
		}
		catch(PDOException $e)
		{
			http_response_code(400);//FIX ME NOT SENDING
			return ['error'=>$e->getMessage()];
		}
	}
	public function approve($rel_id)
	{
		try
		{
			if(isset($_SESSION['user_session']))
			{
				$stmt = $this->db->prepare("UPDATE role_user_school_relation SET is_approved=1 WHERE id = :rid");
				$stmt->bindparam(":rid", $rel_id, PDO::PARAM_INT);
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
	public function add_school_timetable($timetable, $school_id)
	{
		try
		{
			if(isset($_SESSION['user_session']))
			{
				//var_dump ($timetable);
				//var_dump ($timetable);
				$t = json_decode($timetable);
				// var_dump ($t[1]);
				$s = "INSERT INTO school_time (school_id, lesson, start_time) VALUES ";
				for($i = 0; $i < count($t); $i=$i+1)
				{//todo: fix this to be secure
					$s=$s."(".$school_id.",".$i.",".'\''.$t[$i].'\''.")";
					if($i != count($t)-1)
						$s=$s.',';
				}
				$stmt = $this->db->prepare($s);
				$stmt->bindparam(":rid", $rel_id, PDO::PARAM_INT);
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
			$stmt = $this->db->prepare("SELECT id, project_name, school_id, start, finish, creation_time, lessons_per_day FROM projects WHERE owner_id = :cid");
			$stmt->bindparam(":cid", $_SESSION['user_session'], PDO::PARAM_INT);
			$stmt->execute();
			$result = $stmt->fetchall(PDO::FETCH_ASSOC);
			
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
