<?php

class Patient extends MX_Controller
{
	public function __construct()
	{
		$this->load->model('Patient_model', 'pModel');
		$this->load->model('location_model', 'lModel');

	}

	public function edit()
	{
		$data = $this->pModel->getPatient('id', $this->input->get('id'));
		$this->load->view('navbar');
		$this->load->view('modal');
		if ($this->input->get('id') != null) {
			$this->load->view('edit', array('patData' => $data));
		} else {
			$this->load->view('edit');
		}
	}

	public function listPatient()
	{
		$this->load->view('navbar');
		$this->load->view('modal');
		$this->load->view('list');
	}

	public function getPatient()
	{
		if ($this->input->get('id') != null) {
			echo json_encode(['data' => $this->pModel->getPatient('id', $this->input->get('id'))]);
		} else if ($this->input->get('num') != null) {
			echo json_encode(['data' => $this->pModel->getPatient('num', $this->input->get('num'))]);
		} else if ($this->input->get('text') != null) {
			echo json_encode(['data' => $this->pModel->getPatient('text', $this->input->get('text'))]);
		} else {
			echo json_encode(['data' => $this->pModel->getPatient()]);
		}
	}

	public function verifyForm()
	{
		$this->form_validation->set_rules('patient[firstname]', 'Firstname', 'required');
		$this->form_validation->set_rules('patient[surname]', 'Lastname', 'required');
		$this->form_validation->set_rules('patient[age]', 'Age', array('required', 'numeric'), array('numeric' => 'You must enter valid age'));
		$this->form_validation->set_rules('patient[gender]', 'Gender', 'required');
		$this->form_validation->set_rules('patient[userLanguage]', 'Language', 'required');
		$this->form_validation->set_rules('patient[countryId]', 'Country', 'required|greater_than[0]', array('greater_than' => 'You must select country.'));
		$this->form_validation->set_rules('patient[provinceId]', 'Province', 'required|greater_than[0]', array('greater_than' => 'You must select province.'));
		$this->form_validation->set_rules('patient[municipalityId]', 'Municipality', 'required|greater_than[0]', array('greater_than' => 'You must select municipality.'));
		$this->form_validation->set_rules('patient[address]', 'Address', 'required');
		$this->form_validation->set_rules('patient[mobileNumber]', 'Mobile Number', 'required|numeric', array('numeric' => 'You must enter valid mobile number.'));
//		$this->form_validation->set_rules('patient[currentDateTime]', 'Date Time', 'required');
		if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			if (!$this->form_validation->run()) {
				echo json_encode(['success' => false, 'errors' => validation_errors()]);
			} else {
				echo json_encode(['success' => true]);
			}
		}
	}

	public function addPatient()
	{
		$data = $this->input->post('patient');
		$data['userLanguage'] = implode(',', $data['userLanguage']);
		if ($this->pModel->addPatient($data)) {
			echo json_encode(["success" => true]);
		} else {
			echo json_encode(["success" => false]);
		}

	}

	public function getLocations()
	{
		if ($this->input->get('type') == 'countries') {
			echo json_encode(['data' => $this->lModel->getLocations('countries')]);
		} else if ($this->input->get('type') == 'provinces') {
			echo json_encode(['data' => $this->lModel->getLocations('provinces', $this->input->get('countryId'))]);
		} else if ($this->input->get('type') == 'municipalities') {
			echo json_encode(['data' => $this->lModel->getLocations('municipalities', $this->input->get('provinceId'))]);
		}
	}

}
