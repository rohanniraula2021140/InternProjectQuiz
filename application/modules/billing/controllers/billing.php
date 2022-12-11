<?php

class billing extends MX_Controller
{

	public function __construct()
	{
		$this->load->model('billing_model', 'bModel');
	}

	public function edit()
	{
		$this->load->view('navbar');
		$this->load->view('modal');
		$this->load->view('toast');
		$this->load->view('billing/edit', ['sampleNo' => $this->input->get('sampleNo')]);
	}

	public function listBills()
	{
		$this->load->view('navbar');
		$this->load->view('modal');
		$this->load->view('toast');
		$this->load->view('billing/list');
	}

	public function getTests()
	{
		echo json_encode(["data" => $this->bModel->getTests()]);
	}

	public function getBill()
	{

		if (is_null($this->input->get('id'))) {
			echo json_encode(['data' => $this->bModel->getBill()]);
		} else {
			echo json_encode(['data' => $this->bModel->getBill($this->input->get('id'))]);
		}
	}

	public function sendBill()
	{
		if (!is_null($this->input->post('bill'))) {
			$data = $this->input->post('bill');
			$sampleNo = $this->input->post('sampleNo');
			if ($sampleNo) {
				$billData = array('sampleNo' => $sampleNo, 'patientId' => $data['patientId'], 'subTotal' => $data['subTotal'], 'discountPercent' => $data['discountP'], 'discountAmount' => $data['discount'], 'netTotal' => $data['netTotal']);
			} else {
				$billData = array('patientId' => $data['patientId'], 'billingDate' => date('Y-m-d H:i:s'), 'subTotal' => $data['subTotal'], 'discountPercent' => $data['discountP'], 'discountAmount' => $data['discount'], 'netTotal' => $data['netTotal']);
			}
			$testData = $data['tests'];
			$test = array();
			foreach ($testData as $testDatum) {
				$test[] = array('testItems' => $testDatum['testId'], 'qty' => $testDatum['qty'], 'unitPrice' => $testDatum['unitPrice'], 'price' => $testDatum['totalPrice']);
			}
			echo json_encode(['success' => $this->bModel->sendBill($billData, $test)]);
		} else {
			echo json_encode(['error' => 'Internal server error']);
		}
	}

	public function removeBill()
	{
		if ($this->input->get('id')) {
			$id = $this->input->get('id');
			echo json_encode(['data' => $this->bModel->removeBill($id)]);
		} else {
			echo json_encode(['error' => 'Internal server error']);
		}
	}


}
