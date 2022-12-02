<?php

class Quiz extends CI_Controller
{
	public function index()
	{
		$this->form_validation->set_rules('user[name]', 'User name', 'required|alpha');
		if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			if (!$this->form_validation->run()) {
				echo json_encode(['success' => false, 'errors' => validation_errors()]);
			} else {

				echo json_encode(['success' => true]);
			}
		} else {
			$this->load->view('Quiz/home.php');
		}
	}

	/**
	 * @return void
	 */
	public function display()
	{
		$this->load->model('Quiz/Quiz_model');
		if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			if (isset($_GET['id'])) {
				$questions = $this->Quiz_model->getQuestion($_GET['id']);
				echo json_encode($questions);
			} else {
				echo json_encode(['success' => false, 'get' => $_GET]);
			}

		} else {

		}
	}

	//
	//

	public function saveAnswer()
	{
		$this->load->model('Quiz/Quiz_model');
		if ($_SERVER['REQUEST_METHOD'] == "POST") {
			if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
				$data = array();
				$data['name'] = $this->input->post('name');
				$data['question_id'] = $this->input->post('question_id');
				$data['user_result'] = $this->input->post('user_result');
				$data['time_spent'] = (int)$this->input->post('time_spent');
				$data['date_time'] = $this->input->post('date_time');
				if ($this->Quiz_model->saveAnswer($data)) {
					echo json_encode(['success' => true]);
				} else {
					echo json_encode(['success' => false]);
				}
			}
		}
	}

	public function admin()
	{
		$this->load->library('session');

		$this->form_validation->set_rules('login[username]', 'User name', 'required');
		$this->form_validation->set_rules('login[password]', 'Password', 'required');
		if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			  if (!$this->form_validation->run()) {
				echo json_encode(['success' => false, 'session' => false, 'errors' => validation_errors()]);
			} else {
				if ($this->input->post('login')['username'] == 'admin' && $this->input->post('login')['password'] == "admin") {
					$this->session->set_userdata('loggedin', true);
					echo json_encode(['success' => true]);
				} else {
					echo json_encode(['success' => false, 'errors' => "<p>Credentials didn't matched</p>"]);
				}
			}
		} else {
			$this->load->view('Quiz/admin.php');
		}
	}


	public function getAdminReport()
	{
		$this->load->model('Quiz/Quiz_model');
		if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			echo json_encode(['success' => true, 'data' => $this->Quiz_model->getAdminReport()]);
		}
	}

	public function getSingleData()
	{
		$this->load->model('Quiz/Quiz_model');
		if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			$name = $this->input->post('name');
			$date_time = $this->input->post('date_time');
			echo json_encode(['success' => true, 'data' => $this->Quiz_model->getSinglePlayerStatus($name, $date_time)]);
		}
	}


	public function handleSession()
	{
		$this->load->library('session');

		if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			if ($this->input->get('sessionStatus')) {
				$userData = $this->session->get_userdata();
				if (isset($userData['loggedin']) && $userData['loggedin']) {
					echo json_encode(['success'=>true, 'session'=>true]);
				} else {
					echo json_encode(['success'=>true, 'session'=>false]);
				}
			} else if ($this->input->get('logout')) {
				$this->session->set_userdata('loggedin', false);
				echo json_encode(['success'=>true, 'logout'=>true]);
			}
		}
	}
}
