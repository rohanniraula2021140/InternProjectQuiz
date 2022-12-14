<?php

class billing_model extends CI_Model
{

	public function __construct()
	{
		$this->load->database();
	}

	public function getTests()
	{
		return $this->db->get('tests')->result_object();
	}

	public function getBill($value = null)
	{
		if (is_null($value)) {
			return $this->db->select()->from('billinfos b')->join('patients p', 'on p.id = b.patientId')->order_by('b.billingDate DESC')->get()->result_object();
		} else {
			$data['bill'] = $this->db->select()->from('billinfos b')->join('patients p', 'on p.id = b.patientId')->join('municipalities m', 'on m.municipalityId = p.municipalityId')->where('sampleNo', $value)->get()->row_object();
			$data['tests'] = $this->db->select()->from('testitems ts')->join('tests t', 'on t.testId = ts.testItems')->where('ts.sampleNo', $value)->get()->result_object();
			return $data;
		}
	}

	public function removeBill($id)
	{
		$this->session->set_flashdata('message','Bill Removed');
		return $this->db->where('sampleNo', $id)->delete('billinfos');
	}

	public function removeTest($id)
	{
		return $this->db->where('testItemId', $id)->delete('testitems');
	}


	public function sendBill($bill, $test)
	{

		if (isset($bill['sampleNo'])) {
			$billId = $bill['sampleNo'];
			unset($bill['sampleNo']);
			$this->session->set_flashdata('message','Bill Updated');
			$this->db->where('sampleNo', $billId)->update('billinfos', $bill);
			$this->db->where('sampleNo', $billId)->delete('testitems');
		} else {
			$this->session->set_flashdata('message','Bill Saved');
			$this->db->insert('billinfos', $bill);
			$billId = $this->db->insert_id();
		}
		foreach ($test as $testDatum) {
			$testDatum['sampleNo'] = $billId;
			$this->db->insert('testitems', $testDatum);
		}

	}
}
